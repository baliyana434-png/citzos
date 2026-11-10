/**
 * Server-Side OTP Store & Rate Limiter
 * Provides secure 5-minute TTL, attempt limits, rate-limiting,
 * and persistent storage across worker instances and server restarts.
 */

import fs from 'fs';
import path from 'path';

interface OtpRecord {
  otp: string;
  expiresAt: number;
  attempts: number;
}

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const OTP_CACHE_FILE = path.join(process.cwd(), 'src', 'data', 'otp_cache.json');

class OtpStore {
  private otps: Map<string, OtpRecord> = new Map();
  private rateLimits: Map<string, RateLimitRecord> = new Map();

  constructor() {
    this.loadFromDisk();
    // Run cleanup every 2 minutes
    if (typeof setInterval !== 'undefined') {
      const timer = setInterval(() => this.cleanup(), 2 * 60 * 1000);
      if (timer && typeof timer.unref === 'function') {
        timer.unref();
      }
    }
  }

  private loadFromDisk(): void {
    try {
      if (fs.existsSync(OTP_CACHE_FILE)) {
        const raw = fs.readFileSync(OTP_CACHE_FILE, 'utf-8');
        const data = JSON.parse(raw);
        const now = Date.now();
        if (data.otps && typeof data.otps === 'object') {
          for (const [phone, rec] of Object.entries(data.otps)) {
            const r = rec as OtpRecord;
            if (r.expiresAt > now) {
              this.otps.set(phone, r);
            }
          }
        }
      }
    } catch (e) {
      // Ignore disk load error
    }
  }

  private persistToDisk(): void {
    try {
      const obj: Record<string, OtpRecord> = {};
      const now = Date.now();
      for (const [phone, rec] of this.otps.entries()) {
        if (rec.expiresAt > now) {
          obj[phone] = rec;
        }
      }
      fs.writeFileSync(OTP_CACHE_FILE, JSON.stringify({ otps: obj }, null, 2), 'utf-8');
    } catch (e) {
      // Ignore disk write failure in read-only environments
    }
  }

  /**
   * Save OTP for a phone number with TTL (default 5 minutes)
   */
  setOtp(phone: string, otp: string, ttlMs: number = 5 * 60 * 1000): void {
    this.otps.set(phone, {
      otp,
      expiresAt: Date.now() + ttlMs,
      attempts: 0,
    });
    this.persistToDisk();
  }

  /**
   * Retrieve OTP record if not expired
   */
  getOtpRecord(phone: string): OtpRecord | null {
    let record = this.otps.get(phone);
    if (!record) {
      // Check disk cache in case written by another worker process
      this.loadFromDisk();
      record = this.otps.get(phone);
    }
    if (!record) return null;

    if (Date.now() > record.expiresAt) {
      this.otps.delete(phone);
      this.persistToDisk();
      return null;
    }

    return record;
  }

  /**
   * Increment failed attempt count
   */
  incrementAttempts(phone: string): number {
    const record = this.getOtpRecord(phone);
    if (!record) return 0;
    record.attempts += 1;
    this.otps.set(phone, record);
    this.persistToDisk();
    return record.attempts;
  }

  /**
   * Remove OTP upon successful verification
   */
  deleteOtp(phone: string): void {
    this.otps.delete(phone);
    this.persistToDisk();
  }

  /**
   * Rate limiting: max N requests per window (default: 4 requests per hour)
   */
  checkRateLimit(phone: string, maxRequests: number = 4, windowMs: number = 60 * 60 * 1000): { allowed: boolean; remaining: number; resetInSeconds: number } {
    const now = Date.now();
    const record = this.rateLimits.get(phone);

    if (!record || now > record.resetAt) {
      this.rateLimits.set(phone, { count: 1, resetAt: now + windowMs });
      return { allowed: true, remaining: maxRequests - 1, resetInSeconds: Math.ceil(windowMs / 1000) };
    }

    if (record.count >= maxRequests) {
      const resetInSeconds = Math.ceil((record.resetAt - now) / 1000);
      return { allowed: false, remaining: 0, resetInSeconds };
    }

    record.count += 1;
    return { allowed: true, remaining: maxRequests - record.count, resetInSeconds: Math.ceil((record.resetAt - now) / 1000) };
  }

  /**
   * Clean up expired records
   */
  private cleanup(): void {
    const now = Date.now();
    let changed = false;
    for (const [phone, record] of this.otps.entries()) {
      if (now > record.expiresAt) {
        this.otps.delete(phone);
        changed = true;
      }
    }
    for (const [phone, record] of this.rateLimits.entries()) {
      if (now > record.resetAt) {
        this.rateLimits.delete(phone);
      }
    }
    if (changed) {
      this.persistToDisk();
    }
  }
}

// Global singleton instance across Next.js API route calls
const globalForOtp = globalThis as unknown as { otpStore?: OtpStore };
export const otpStore = globalForOtp.otpStore ?? new OtpStore();
globalForOtp.otpStore = otpStore;
