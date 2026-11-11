import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { AdminSecurityService } from '@/lib/security';
import { rateLimiter } from '@/lib/rateLimiter';

export async function POST(req: NextRequest) {
  try {
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';
    const rateKey = `admin_auth:${ip}`;

    const body = await req.json().catch(() => ({}));
    const pin = String(body.pin || '').trim();
    const expectedPin = process.env.ADMIN_PIN || '242022';

    // Timing-safe constant-time comparison against side-channel timing attacks
    const pinBuffer = Buffer.from(pin);
    const expectedBuffer = Buffer.from(expectedPin);
    const isValid =
      pinBuffer.length === expectedBuffer.length &&
      crypto.timingSafeEqual(pinBuffer, expectedBuffer);

    // If Master PIN is authentic: Grant clearance immediately and reset any lockout counters
    if (isValid) {
      rateLimiter.reset(rateKey);
      rateLimiter.reset('admin_auth:global');
      const token = AdminSecurityService.generateAdminToken();

      return NextResponse.json({
        success: true,
        token,
        message: 'व्यवस्थापक सुरक्षा क्लीयरेंस स्वीकृत।',
        messageEn: 'Admin security clearance granted.',
      });
    }

    // ONLY PENALIZE ON FAILED (INVALID) PIN ATTEMPTS:
    // Anti-brute-force Layer 1: Global protection against distributed bot attacks
    const globalLimit = rateLimiter.consume('admin_auth:global', 30, 15 * 60 * 1000, 15 * 60 * 1000);
    if (!globalLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          errorType: 'GLOBAL_ADMIN_LOCKOUT',
          message: `सुरक्षा अलर्ट: अत्यधिक असफल प्रयासों के कारण व्यवस्थापक गेट अस्थायी रूप से बंद है। कृपया ${globalLimit.resetInSeconds} सेकंड बाद प्रयास करें।`,
          messageEn: `Security Alert: Global admin authentication gateway cooldown active for ${globalLimit.resetInSeconds}s.`,
          retryAfter: globalLimit.resetInSeconds,
        },
        { status: 429 }
      );
    }

    // Anti-brute-force Layer 2: Per-IP Protection (10 failed attempts per 15 minutes)
    const limit = rateLimiter.consume(rateKey, 10, 15 * 60 * 1000, 10 * 60 * 1000);
    if (!limit.allowed) {
      return NextResponse.json(
        {
          success: false,
          errorType: 'TOO_MANY_ATTEMPTS',
          message: `व्यवस्थापक सत्यापन अवरोधित: अत्यधिक असफल प्रयासों के कारण यह टर्मिनल ${limit.resetInSeconds} सेकंड के लिए लॉक है।`,
          messageEn: `Admin authentication locked: Terminal cooldown active for ${limit.resetInSeconds}s.`,
          retryAfter: limit.resetInSeconds,
        },
        { status: 429 }
      );
    }

    if (!pin || pin.length < 6) {
      return NextResponse.json(
        {
          success: false,
          errorType: 'INVALID_PIN_FORMAT',
          message: 'कृपया वैध 6-अंकीय व्यवस्थापक सुरक्षा पिन दर्ज करें।',
          messageEn: 'Please enter a valid 6-digit admin security clearance PIN.',
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        errorType: 'INVALID_PIN',
        message: `अमान्य सुरक्षा पिन। शेष प्रयास: ${limit.remaining}`,
        messageEn: `Invalid PIN. Attempts remaining: ${limit.remaining}`,
        remaining: limit.remaining,
      },
      { status: 401 }
    );
  } catch (error: any) {
    console.error('Admin Auth Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'व्यवस्थापक सत्यापन में आंतरिक त्रुटि।',
        messageEn: 'Internal error during admin verification.',
      },
      { status: 500 }
    );
  }
}
