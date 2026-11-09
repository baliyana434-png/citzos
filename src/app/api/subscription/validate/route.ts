import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/db';
import { PaymentSecurityService } from '@/lib/security';
import { CitizenSubscription } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const citizenId = PaymentSecurityService.sanitizeString(body.citizenId);
    const email = body.email ? String(body.email).trim().toLowerCase() : undefined;
    const clientSubscription = body.subscription as CitizenSubscription;

    if (!citizenId && !email) {
      return NextResponse.json(
        { valid: false, reason: 'MISSING_PAYLOAD' },
        { status: 400 }
      );
    }

    // 1. Authoritative check from MongoDB Atlas Database
    const citizen = await DatabaseService.findCitizen({ id: citizenId, email });
    let effectiveSub: CitizenSubscription | undefined = citizen?.subscription;

    // If not found in DB or DB subscription not set, verify cryptographic HMAC signature of client subscription
    if (!effectiveSub && clientSubscription) {
      const isSignatureAuthentic = PaymentSecurityService.verifySignature(clientSubscription, citizenId);
      if (isSignatureAuthentic) {
        effectiveSub = clientSubscription;
        // Securely persist verified subscription to MongoDB so citizen record is always in sync
        if (citizen) {
          citizen.subscription = clientSubscription;
          await DatabaseService.saveCitizen(citizen);
        }
      } else {
        return NextResponse.json(
          {
            valid: false,
            reason: 'INVALID_SIGNATURE',
            message: 'सुरक्षा त्रुटि: सदस्यता डिजिटल हस्ताक्षर अमान्य या जाली है।',
          },
          { status: 403 }
        );
      }
    }

    if (effectiveSub && effectiveSub.status === 'active' && effectiveSub.validUntil) {
      const now = Date.now();
      const expiry = new Date(effectiveSub.validUntil).getTime();

      if (expiry > now) {
        // ACTIVE AND UNEXPIRED (Within 365 days)
        const daysRemaining = Math.max(1, Math.ceil((expiry - now) / (1000 * 60 * 60 * 24)));
        return NextResponse.json({
          valid: true,
          subscription: effectiveSub,
          validUntil: effectiveSub.validUntil,
          daysRemaining,
          message: '1-Year Citizen Pass active and valid.',
        });
      } else {
        // 365 DAYS HAVE GENUINELY EXPIRED
        if (citizen && citizen.subscription) {
          citizen.subscription.status = 'expired';
          await DatabaseService.saveCitizen(citizen);
        }
        return NextResponse.json({
          valid: false,
          expired: true,
          reason: 'SUBSCRIPTION_EXPIRED_AFTER_365_DAYS',
          message: 'आपकी 1-वर्षीय सदस्यता समाप्त हो चुकी है। कृपया नवीनीकरण करें।',
        });
      }
    }

    return NextResponse.json({
      valid: false,
      reason: 'NO_ACTIVE_SUBSCRIPTION',
    }, { status: 200 });
  } catch (error: any) {
    console.error('Subscription validation error:', error);
    return NextResponse.json(
      { valid: false, reason: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}
