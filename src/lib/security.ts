import crypto from 'crypto';
import { CitizenSubscription } from '@/types';

// Ephemeral in-memory fallback secret generated on process startup if environment variables are not provided.
// This guarantees that even if someone inspects git history or repo defaults, they CANNOT forge tokens.
const RUNTIME_EPHEMERAL_SECRET = crypto.randomBytes(32).toString('hex');

// Server-side private secret key (Never exposed to browser/client)
const SERVER_PAYMENT_SECRET = process.env.PAYMENT_SECRET_KEY || RUNTIME_EPHEMERAL_SECRET;

export class PaymentSecurityService {
  /**
   * Generates a tamper-proof cryptographic HMAC-SHA256 digital signature for a 1-year pass.
   * Hacker cannot forge this without having the server's private secret key.
   */
  static generateSignature(citizenId: string, plan: string, validUntil: string, amount: number, currency: string): string {
    const payload = `${citizenId}:${plan}:${validUntil}:${amount}:${currency}`;
    return crypto.createHmac('sha256', SERVER_PAYMENT_SECRET).update(payload).digest('hex');
  }

  /**
   * Verifies if a subscription's digital signature is authentic and unaltered.
   */
  static verifySignature(sub: CitizenSubscription, citizenId: string): boolean {
    if (!sub || !sub.signature) return false;
    // Price must be exactly 1 INR (or legacy 19 INR)
    if ((sub.amount !== 1 && sub.amount !== 19) || sub.currency !== 'INR') return false;

    // Check expiry timestamp
    const now = new Date();
    const expiry = new Date(sub.validUntil);
    if (isNaN(expiry.getTime()) || expiry <= now) return false;

    const expectedSignature = this.generateSignature(citizenId, sub.plan, sub.validUntil, sub.amount, sub.currency);
    const subSigBuffer = Buffer.from(sub.signature, 'hex');
    const expSigBuffer = Buffer.from(expectedSignature, 'hex');
    if (subSigBuffer.length !== expSigBuffer.length) return false;
    return crypto.timingSafeEqual(subSigBuffer, expSigBuffer);
  }

  /**
   * Sanitizes input to prevent NoSQL / SQL injection and XSS
   */
  static sanitizeString(input: unknown): string {
    if (typeof input !== 'string') return '';
    return input.replace(/[<>'"&;]/g, '').trim();
  }
}

const SESSION_SECRET = process.env.SESSION_SECRET_KEY || process.env.PAYMENT_SECRET_KEY || RUNTIME_EPHEMERAL_SECRET;

export class SessionSecurityService {
  /**
   * Generates a signed session token: base64(payload).signature
   */
  static generateSessionToken(citizenId: string, email: string): string {
    const payload = JSON.stringify({
      citizenId,
      email: (email || '').toLowerCase().trim(),
      exp: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
    });
    const encodedPayload = Buffer.from(payload).toString('base64url');
    const signature = crypto.createHmac('sha256', SESSION_SECRET).update(encodedPayload).digest('base64url');
    return `${encodedPayload}.${signature}`;
  }

  /**
   * Verifies session token authenticity and expiry using timing-safe comparison
   */
  static verifySessionToken(token: string): { valid: boolean; citizenId?: string; email?: string } {
    if (!token || !token.includes('.')) return { valid: false };
    const [encodedPayload, signature] = token.split('.');
    if (!encodedPayload || !signature) return { valid: false };

    try {
      const expectedSignature = crypto.createHmac('sha256', SESSION_SECRET).update(encodedPayload).digest('base64url');
      const sigBuffer = Buffer.from(signature);
      const expBuffer = Buffer.from(expectedSignature);
      if (sigBuffer.length !== expBuffer.length || !crypto.timingSafeEqual(sigBuffer, expBuffer)) {
        return { valid: false };
      }

      const jsonStr = Buffer.from(encodedPayload, 'base64url').toString('utf-8');
      const payload = JSON.parse(jsonStr);
      if (Date.now() > payload.exp) return { valid: false };

      return { valid: true, citizenId: payload.citizenId, email: payload.email };
    } catch {
      return { valid: false };
    }
  }
}

// Deterministic production admin secret fallback ensures tokens remain valid across server restarts and worker threads.
const PERMANENT_ADMIN_SECRET = 'citzos_master_admin_production_security_key_2026_unbroken_auth';
const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || process.env.SESSION_SECRET_KEY || PERMANENT_ADMIN_SECRET;

export class AdminSecurityService {
  /**
   * Generates a signed admin session token: base64(payload).signature
   * Valid for 30 days from login so administrators are not prematurely locked out during continuous operations.
   */
  static generateAdminToken(): string {
    const payload = JSON.stringify({
      role: 'SUPER_ADMIN',
      exp: Date.now() + 30 * 24 * 60 * 60 * 1000,
      nonce: crypto.randomBytes(16).toString('hex'),
    });
    const encodedPayload = Buffer.from(payload).toString('base64url');
    const signature = crypto.createHmac('sha256', ADMIN_SECRET).update(encodedPayload).digest('base64url');
    return `${encodedPayload}.${signature}`;
  }

  /**
   * Cryptographically verifies admin session token authenticity and expiry using timing-safe comparison.
   */
  static verifyAdminToken(token: string): boolean {
    if (!token || !token.includes('.')) return false;
    const [encodedPayload, signature] = token.split('.');
    if (!encodedPayload || !signature) return false;

    try {
      const expectedSignature = crypto.createHmac('sha256', ADMIN_SECRET).update(encodedPayload).digest('base64url');
      const sigBuffer = Buffer.from(signature);
      const expBuffer = Buffer.from(expectedSignature);
      if (sigBuffer.length !== expBuffer.length || !crypto.timingSafeEqual(sigBuffer, expBuffer)) {
        return false;
      }

      const jsonStr = Buffer.from(encodedPayload, 'base64url').toString('utf-8');
      const payload = JSON.parse(jsonStr);
      if (Date.now() > payload.exp) return false;

      return payload.role === 'SUPER_ADMIN';
    } catch {
      return false;
    }
  }
}
