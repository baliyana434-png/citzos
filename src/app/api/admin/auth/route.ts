import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { AdminSecurityService, ADMIN_COOKIE_NAME } from '@/lib/security';
import { rateLimiter } from '@/lib/rateLimiter';
import { verifyCloudflareAccess } from '@/lib/cloudflareAccess';
import { SecurityAuditLogger } from '@/lib/auditLogger';
import { AdminRole } from '@/lib/rbac';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';
  const userAgent = req.headers.get('user-agent') || 'Unknown';
  const rateKey = `admin_auth:${ip}`;

  try {
    // 1. Verify Cloudflare Access Layer (if present)
    const cfCheck = verifyCloudflareAccess(req);
    if (!cfCheck.valid) {
      await SecurityAuditLogger.record({
        eventType: 'UNAUTHORIZED_ADMIN_API_ACCESS',
        adminIdentifier: cfCheck.email || 'Cloudflare-Rejected',
        role: 'UNAUTHENTICATED',
        ipAddress: ip,
        userAgent,
        resourcePath: '/api/admin/auth',
        outcome: 'DENIED',
        details: { reason: cfCheck.reason },
      });

      return NextResponse.json(
        {
          success: false,
          errorType: 'CLOUDFLARE_ACCESS_DENIED',
          message: cfCheck.reason || 'Cloudflare Zero Trust identity rejected.',
          messageEn: cfCheck.reason || 'Cloudflare Zero Trust identity rejected.',
        },
        { status: 403 }
      );
    }

    const adminEmail = cfCheck.email || 'baliyana434@gmail.com';
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
      const token = AdminSecurityService.generateAdminToken('SUPER_ADMIN', adminEmail);

      await SecurityAuditLogger.record({
        eventType: 'ADMIN_LOGIN_SUCCESS',
        adminIdentifier: adminEmail,
        role: 'SUPER_ADMIN',
        ipAddress: ip,
        userAgent,
        resourcePath: '/api/admin/auth',
        outcome: 'SUCCESS',
        details: { isCloudflareSecured: cfCheck.isCloudflareSecured },
      });

      const response = NextResponse.json(
        {
          success: true,
          token,
          role: 'SUPER_ADMIN',
          email: adminEmail,
          message: 'व्यवस्थापक सुरक्षा क्लीयरेंस स्वीकृत।',
          messageEn: 'Admin security clearance granted.',
        },
        {
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          },
        }
      );

      // Issue HttpOnly secure cookie for enterprise session protection
      response.cookies.set({
        name: ADMIN_COOKIE_NAME,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 8 * 60 * 60, // 8 hours
        path: '/',
      });

      return response;
    }

    // ONLY PENALIZE ON FAILED (INVALID) PIN ATTEMPTS:
    // Anti-brute-force Layer 1: Global protection against distributed bot attacks
    const globalLimit = rateLimiter.consume('admin_auth:global', 30, 15 * 60 * 1000, 15 * 60 * 1000);
    if (!globalLimit.allowed) {
      await SecurityAuditLogger.record({
        eventType: 'ADMIN_LOCKOUT_TRIGGERED',
        adminIdentifier: adminEmail,
        role: 'UNAUTHENTICATED',
        ipAddress: ip,
        userAgent,
        resourcePath: '/api/admin/auth',
        outcome: 'DENIED',
        details: { scope: 'GLOBAL', retryAfter: globalLimit.resetInSeconds },
      });

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
      await SecurityAuditLogger.record({
        eventType: 'ADMIN_LOCKOUT_TRIGGERED',
        adminIdentifier: adminEmail,
        role: 'UNAUTHENTICATED',
        ipAddress: ip,
        userAgent,
        resourcePath: '/api/admin/auth',
        outcome: 'DENIED',
        details: { scope: 'PER_IP', retryAfter: limit.resetInSeconds },
      });

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

    await SecurityAuditLogger.record({
      eventType: 'ADMIN_LOGIN_FAILED',
      adminIdentifier: adminEmail,
      role: 'UNAUTHENTICATED',
      ipAddress: ip,
      userAgent,
      resourcePath: '/api/admin/auth',
      outcome: 'DENIED',
      details: { remainingAttempts: limit.remaining },
    });

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

export async function GET(req: NextRequest) {
  const cookieToken = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const headerToken = req.headers.get('x-admin-token');
  const token = cookieToken || headerToken;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const session = AdminSecurityService.verifyAdminSession(token);
  if (!session.valid || !session.role) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json(
    {
      authenticated: true,
      role: session.role,
      email: session.email || 'baliyana434@gmail.com',
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    }
  );
}

export async function DELETE(req: NextRequest) {
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';
  const userAgent = req.headers.get('user-agent') || 'Unknown';

  const cookieToken = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const headerToken = req.headers.get('x-admin-token');
  const token = cookieToken || headerToken;

  let adminIdentifier = 'SuperAdmin';
  let role: AdminRole | 'UNAUTHENTICATED' = 'SUPER_ADMIN';

  if (token) {
    const session = AdminSecurityService.verifyAdminSession(token);
    if (session.email) adminIdentifier = session.email;
    if (session.role) role = session.role;
  }

  await SecurityAuditLogger.record({
    eventType: 'ADMIN_LOGOUT',
    adminIdentifier,
    role,
    ipAddress: ip,
    userAgent,
    resourcePath: '/api/admin/auth',
    outcome: 'SUCCESS',
    details: { action: 'Session terminated by user request' },
  });

  const response = NextResponse.json(
    {
      success: true,
      message: 'Admin session terminated successfully.',
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    }
  );

  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });

  return response;
}

