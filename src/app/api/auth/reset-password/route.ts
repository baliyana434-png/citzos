import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService, hashCitizenPassword } from '@/lib/db';
import { SessionSecurityService } from '@/lib/security';
import { SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from '@/lib/sessionEdge';
import { validateRealEmail, validateRealPassword } from '@/utils/antiFraudValidation';
import { otpStore } from '@/lib/otpStore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawEmail = String(body.email || '').trim().toLowerCase();
    const rawOtp = String(body.otp || body.token || '').trim();
    const newPassword = String(body.newPassword || '');
    const lang = body.lang === 'hi' ? 'hi' : 'en';

    // 1. Email Format Check
    const emailValidation = validateRealEmail(rawEmail, lang);
    if (!emailValidation.valid) {
      return NextResponse.json(
        {
          success: false,
          errorType: 'INVALID_EMAIL',
          message: emailValidation.error || (lang === 'hi' ? 'अमान्य ईमेल प्रारूप।' : 'Invalid email format.'),
        },
        { status: 400 }
      );
    }
    const cleanEmail = emailValidation.cleanEmail;

    // 2. Fetch Citizen Account
    const citizen = await DatabaseService.findCitizen({ email: cleanEmail });
    if (!citizen) {
      return NextResponse.json(
        {
          success: false,
          errorType: 'ACCOUNT_NOT_FOUND',
          message:
            lang === 'hi'
              ? 'इस ईमेल से संबद्ध कोई खाता नहीं मिला।'
              : 'No account associated with this email address.',
        },
        { status: 404 }
      );
    }

    // 3. Verify OTP or Secret Reset Token
    if (!rawOtp) {
      return NextResponse.json(
        {
          success: false,
          errorType: 'MISSING_OTP',
          message:
            lang === 'hi'
              ? 'कृपया ईमेल पर भेजा गया 6-अंकों का वेरिफिकेशन कोड दर्ज करें।'
              : 'Please enter the 6-digit verification code sent to your email.',
        },
        { status: 400 }
      );
    }

    const resetOtpRecord = otpStore.getOtpRecord(`reset:${cleanEmail}`);
    const tokenRecord = otpStore.getOtpRecord(`token:${rawOtp}`);

    let isMatch = false;
    if (resetOtpRecord && resetOtpRecord.otp === rawOtp) {
      isMatch = true;
    } else if (tokenRecord && tokenRecord.otp === cleanEmail) {
      isMatch = true;
    }

    if (!isMatch) {
      const attempts = otpStore.incrementAttempts(`reset:${cleanEmail}`);
      if (attempts >= 5) {
        otpStore.deleteOtp(`reset:${cleanEmail}`);
        return NextResponse.json(
          {
            success: false,
            errorType: 'MAX_ATTEMPTS_EXCEEDED',
            message:
              lang === 'hi'
                ? 'अधिकतम प्रयास सीमा समाप्त हो गई है। कृपया नया रीसेट कोड पुनः मंगाएं।'
                : 'Maximum attempts exceeded. Please request a new verification code.',
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          errorType: 'INVALID_OTP',
          message:
            lang === 'hi'
              ? `गलत या समाप्त (Expired) वेरिफिकेशन कोड। कृपया Gmail इनबॉक्स चेक करके सही 6-अंकों का कोड डालें।`
              : 'Invalid or expired verification code. Please check your inbox and enter the 6-digit code.',
        },
        { status: 400 }
      );
    }

    // 4. Validate New Password
    const passwordCheck = validateRealPassword(newPassword, citizen.fullName, cleanEmail, lang);
    if (!passwordCheck.valid) {
      return NextResponse.json(
        {
          success: false,
          errorType: 'INVALID_PASSWORD',
          message: passwordCheck.error || (lang === 'hi' ? 'कमजोर पासवर्ड।' : 'Weak password.'),
        },
        { status: 400 }
      );
    }

    // 5. Hash and Persist New Password
    const { hash, salt } = hashCitizenPassword(newPassword);
    citizen.passwordHash = hash;
    citizen.passwordSalt = salt;
    await DatabaseService.saveCitizen(citizen);

    // 6. Invalidate OTP & Token
    otpStore.deleteOtp(`reset:${cleanEmail}`);
    otpStore.deleteOtp(`token:${rawOtp}`);

    // 7. Generate Authenticated Session Token
    const sessionToken = SessionSecurityService.generateSessionToken(citizen.id, citizen.email || '');

    // 8. Sanitize profile to return to client
    const { passwordHash: _ph, passwordSalt: _ps, ...safeCitizen } = citizen;

    const response = NextResponse.json({
      success: true,
      message:
        lang === 'hi'
          ? 'आपका पासवर्ड सफलतापूर्वक अपडेट हो गया है! आप लॉग इन हो चुके हैं।'
          : 'Your password has been successfully reset! You are now logged in.',
      citizen: safeCitizen,
      sessionToken,
    });

    // Set httpOnly session cookie so user stays authenticated across page reloads
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_MAX_AGE_SECONDS,
    });

    return response;
  } catch (error: any) {
    console.error('Reset Password API Error:', error);
    return NextResponse.json(
      {
        success: false,
        errorType: 'SERVER_ERROR',
        message: error.message || 'पासवर्ड अपडेट करने में तकनीकी समस्या आई।',
      },
      { status: 500 }
    );
  }
}
