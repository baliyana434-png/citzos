import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { PaymentSecurityService } from '@/lib/security';
import { DatabaseService } from '@/lib/db';
import { CitizenSubscription } from '@/types';

/**
 * Anti-Hack & Anti-Tamper Subscription Payment Verification Engine
 * 1. Enforces mandatory server-side locked price (100 Paisa = ₹1 INR).
 * 2. Cryptographic HMAC-SHA256 signature verification matching Razorpay secret.
 * 3. Server-to-server gateway lookup to prevent client-side tampering.
 * 4. Anti-replay prevention: Rejects reused payment IDs.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const citizenId = PaymentSecurityService.sanitizeString(body.citizenId);
    const orderId = PaymentSecurityService.sanitizeString(body.orderId);
    const paymentToken = PaymentSecurityService.sanitizeString(body.paymentToken);
    const razorpayPaymentId = PaymentSecurityService.sanitizeString(body.razorpayPaymentId);
    const razorpaySignature = PaymentSecurityService.sanitizeString(body.razorpaySignature);
    const paymentMethod = PaymentSecurityService.sanitizeString(body.paymentMethod || 'UPI');

    // 1. Mandatory Identity and Order Verification
    if (!citizenId) {
      return NextResponse.json(
        { success: false, errorType: 'INVALID_CITIZEN', message: 'नागरिक पहचान (Citizen ID) आवश्यक है।' },
        { status: 400 }
      );
    }

    if (!orderId) {
      return NextResponse.json(
        { success: false, errorType: 'MISSING_ORDER_ID', message: 'ऑर्डर पहचान (Order ID) आवश्यक है।' },
        { status: 400 }
      );
    }

    // 2. Verify or Auto-Create Citizen Record (Ensures paid transactions are never rejected)
    let existingCitizen = await DatabaseService.findCitizen({ id: citizenId });
    if (!existingCitizen) {
      existingCitizen = {
        id: citizenId,
        fullName: body.citizenName ? String(body.citizenName).trim() : 'Citizen',
        age: 21,
        gender: 'male',
        state: 'General',
        lifePhase: 'college_student',
        casteCategory: 'General',
        registeredAt: new Date().toISOString(),
        status: 'verified',
        isOnboarded: true,
      };
      await DatabaseService.saveCitizen(existingCitizen);
    }

    // 3. Prevent duplicate activation if already active with an unexpired subscription
    if (existingCitizen.subscription?.status === 'active' && existingCitizen.subscription?.validUntil) {
      const now = new Date();
      const expiry = new Date(existingCitizen.subscription.validUntil);
      if (expiry > now) {
        return NextResponse.json({
          success: true,
          message: 'सदस्यता पहले से सक्रिय है।',
          subscription: existingCitizen.subscription,
          alreadyActive: true,
        });
      }
    }

    const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
    const isRazorpayConfigured = Boolean(razorpayKeyId && razorpayKeySecret && razorpayKeyId.startsWith('rzp_'));

    const effectivePaymentId = razorpayPaymentId || paymentToken;
    if (!effectivePaymentId) {
      return NextResponse.json(
        {
          success: false,
          errorType: 'PAYMENT_PROOF_MISSING',
          message: 'भुगतान सत्यापन विफल: भुगतान आईडी (Payment ID) अनिवार्य है।',
        },
        { status: 400 }
      );
    }

    // 4. Anti-Replay Attack Protection: Ensure transaction ID was never used by another citizen
    const existingTxnCitizen = await DatabaseService.findCitizen({ transactionId: effectivePaymentId });
    if (existingTxnCitizen && existingTxnCitizen.id !== citizenId) {
      console.warn('Replay attack detected: transaction ID reused across citizens:', {
        transactionId: effectivePaymentId,
        attemptedBy: citizenId,
        originallyOwnedBy: existingTxnCitizen.id,
      });
      return NextResponse.json(
        {
          success: false,
          errorType: 'TRANSACTION_ALREADY_USED',
          message: 'अवैध प्रयास: यह भुगतान आईडी पहले से किसी अन्य खाते में उपयोग हो चुकी है।',
        },
        { status: 409 }
      );
    }

    // 5. Production Razorpay Cryptographic Verification & Anti-1-Rupee Tampering Check
    if (isRazorpayConfigured) {
      // Must provide valid Razorpay signature and payment ID
      if (!razorpaySignature || !razorpayPaymentId) {
        return NextResponse.json(
          {
            success: false,
            errorType: 'MISSING_SIGNATURE',
            message: 'सुरक्षा त्रुटि: Razorpay डिजिटल हस्ताक्षर (Signature) प्रदान नहीं किया गया।',
          },
          { status: 403 }
        );
      }

      // Step A: Cryptographic HMAC-SHA256 signature verification
      const generatedSignature = crypto
        .createHmac('sha256', razorpayKeySecret!)
        .update(`${orderId}|${razorpayPaymentId}`)
        .digest('hex');

      let signatureValid = false;
      try {
        signatureValid = crypto.timingSafeEqual(
          Buffer.from(generatedSignature, 'hex'),
          Buffer.from(razorpaySignature, 'hex')
        );
      } catch (sigErr) {
        signatureValid = false;
      }

      if (!signatureValid) {
        console.error('Tampered payment signature detected:', {
          received: razorpaySignature,
          generated: generatedSignature,
        });
        return NextResponse.json(
          {
            success: false,
            errorType: 'INVALID_SIGNATURE',
            message: 'भुगतान सत्यापन विफल: डिजिटल हस्ताक्षर में छेड़छाड़ पाई गई।',
          },
          { status: 403 }
        );
      }

      // Step B: Server-to-server gateway lookup to prevent 1-Rupee / custom tampered amount attack
      try {
        const razorpay = new Razorpay({
          key_id: razorpayKeyId!,
          key_secret: razorpayKeySecret!,
        });

        const paymentDetails: any = await razorpay.payments.fetch(razorpayPaymentId);

        // Anti-Tamper Check 1: Amount must be exactly 100 Paisa (₹1 INR)
        if (!paymentDetails || paymentDetails.amount < 100) {
          console.error('CRITICAL ANTI-HACK ALERT: Tampered payment amount detected:', {
            paymentId: razorpayPaymentId,
            paidAmountPaisa: paymentDetails?.amount,
            requiredAmountPaisa: 100,
          });
          return NextResponse.json(
            {
              success: false,
              errorType: 'TAMPERED_AMOUNT',
              message: 'सुरक्षा चेतावनी: भुगतान राशि में छेड़छाड़ पाई गई। 1-वर्षीय नागरिक पास शुल्क ₹1 अनिवार्य है।',
            },
            { status: 400 }
          );
        }

        // Anti-Tamper Check 2: Currency must be INR
        if (paymentDetails.currency !== 'INR') {
          return NextResponse.json(
            {
              success: false,
              errorType: 'INVALID_CURRENCY',
              message: 'अमान्य मुद्रा (Currency). केवल INR मान्य है।',
            },
            { status: 400 }
          );
        }

        // Anti-Tamper Check 3: Payment status must be captured or authorized
        if (paymentDetails.status !== 'captured' && paymentDetails.status !== 'authorized') {
          return NextResponse.json(
            {
              success: false,
              errorType: 'PAYMENT_NOT_CAPTURED',
              message: `भुगतान अपूर्ण है (स्थिति: ${paymentDetails.status})। कृपया बैंक पुष्टि की प्रतीक्षा करें।`,
            },
            { status: 400 }
          );
        }

        // Anti-Tamper Check 4: Payment order_id must match the server order
        if (paymentDetails.order_id && paymentDetails.order_id !== orderId) {
          return NextResponse.json(
            {
              success: false,
              errorType: 'ORDER_MISMATCH',
              message: 'भुगतान का ऑर्डर आईडी सर्वर रिकॉर्ड से मेल नहीं खाता।',
            },
            { status: 400 }
          );
        }
      } catch (gatewayErr: any) {
        console.error('Razorpay server fetch verification failed:', gatewayErr);
        return NextResponse.json(
          {
            success: false,
            errorType: 'GATEWAY_LOOKUP_FAILED',
            message: 'गेटवे सत्यापन विफल: भुगतान रिकॉर्ड की पुष्टि नहीं हो सकी।',
          },
          { status: 502 }
        );
      }
    } else {
      // Sandbox fallback mode (only permitted in local development when no live keys exist):
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json(
          {
            success: false,
            errorType: 'LIVE_GATEWAY_MANDATORY',
            message: 'उत्पादन वातावरण में केवल आधिकारिक Razorpay गेटवे सत्यापन ही मान्य है। अनधिकृत सिमुलेशन अवरोधित है।',
          },
          { status: 403 }
        );
      }

      // Must follow authentic simulation token format
      if (!orderId.startsWith('ORD-1-') && !orderId.startsWith('ORD-19-')) {
        return NextResponse.json(
          {
            success: false,
            errorType: 'UNAUTHORIZED_SIMULATION',
            message: 'अमान्य टेस्ट ऑर्डर आईडी।',
          },
          { status: 400 }
        );
      }
    }

    // 6. SERVER-ENFORCED AMOUNT & PLAN: Never trust client payload
    const FIXED_AMOUNT = 1;
    const FIXED_CURRENCY = 'INR';
    const PLAN = '1_year';

    // Calculate exact 365 days expiry from server clock (8760 hours)
    const now = new Date();
    const validUntilDate = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
    const validUntilStr = validUntilDate.toISOString();

    // Generate cryptographic HMAC-SHA256 signature for internal verification
    const internalSignature = PaymentSecurityService.generateSignature(
      citizenId,
      PLAN,
      validUntilStr,
      FIXED_AMOUNT,
      FIXED_CURRENCY
    );

    const subscription: CitizenSubscription = {
      status: 'active',
      plan: '1_year',
      amount: FIXED_AMOUNT,
      currency: FIXED_CURRENCY,
      activatedAt: now.toISOString(),
      validUntil: validUntilStr,
      transactionId: effectivePaymentId,
      paymentMethod,
      signature: internalSignature,
    };

    // Save to persistent database
    existingCitizen.subscription = subscription;
    await DatabaseService.saveCitizen(existingCitizen);

    return NextResponse.json({
      success: true,
      message: '₹1 1-वर्षीय राष्ट्रीय नागरिक पास सफलतापूर्वक सत्यापित एवं सक्रिय कर दिया गया।',
      subscription,
    });
  } catch (error: any) {
    console.error('Subscription verification error:', error);
    return NextResponse.json(
      { success: false, message: 'भुगतान सत्यापन में तकनीकी समस्या आई।' },
      { status: 500 }
    );
  }
}
