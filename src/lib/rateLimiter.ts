/**
 * In-Memory Rate Limiter with Automatic Expiry & Cleanup
 * Defends authentication endpoints against brute-force, credential stuffing, and DDoS attacks.
 */

interface RateLimitRecord {
  attempts: number;
  firstAttemptAt: number;
  blockedUntil?: number;
}

class InMemoryRateLimiter {
  private records: Map<string, RateLimitRecord> = new Map();

  constructor() {
    if (typeof setInterval !== 'undefined') {
      const timer = setInterval(() => this.cleanup(), 5 * 60 * 1000);
      if (timer && typeof timer.unref === 'function') {
        timer.unref();
      }
    }
  }

  /**
   * Checks whether an action is allowed or should be blocked.
   * @param key Unique key (e.g., "login:user@example.com" or "admin:192.168.1.1")
   * @param maxAttempts Max allowed attempts within the window
   * @param windowMs Time window in milliseconds
   * @param lockoutMs Lockout duration when maxAttempts is exceeded
   */
  consume(
    key: string,
    maxAttempts: number = 5,
    windowMs: number = 5 * 60 * 1000,
    lockoutMs: number = 15 * 60 * 1000
  ): { allowed: boolean; remaining: number; resetInSeconds: number } {
    const now = Date.now();
    const record = this.records.get(key);

    if (!record) {
      this.records.set(key, { attempts: 1, firstAttemptAt: now });
      return { allowed: true, remaining: maxAttempts - 1, resetInSeconds: Math.ceil(windowMs / 1000) };
    }

    // Check if currently locked out
    if (record.blockedUntil && record.blockedUntil > now) {
      const resetInSeconds = Math.ceil((record.blockedUntil - now) / 1000);
      return { allowed: false, remaining: 0, resetInSeconds };
    }

    // Check if the window has expired
    if (now - record.firstAttemptAt > windowMs) {
      this.records.set(key, { attempts: 1, firstAttemptAt: now });
      return { allowed: true, remaining: maxAttempts - 1, resetInSeconds: Math.ceil(windowMs / 1000) };
    }

    // Window still active: increment attempts
    record.attempts += 1;

    if (record.attempts > maxAttempts) {
      record.blockedUntil = now + lockoutMs;
      const resetInSeconds = Math.ceil(lockoutMs / 1000);
      return { allowed: false, remaining: 0, resetInSeconds };
    }

    const resetInSeconds = Math.ceil((record.firstAttemptAt + windowMs - now) / 1000);
    return { allowed: true, remaining: maxAttempts - record.attempts, resetInSeconds };
  }

  /**
   * Resets rate limit for a key upon successful authentication.
   */
  reset(key: string): void {
    this.records.delete(key);
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, rec] of this.records.entries()) {
      if (rec.blockedUntil && rec.blockedUntil < now) {
        this.records.delete(key);
      } else if (now - rec.firstAttemptAt > 60 * 60 * 1000) {
        this.records.delete(key);
      }
    }
  }
}

export const rateLimiter = new InMemoryRateLimiter();
