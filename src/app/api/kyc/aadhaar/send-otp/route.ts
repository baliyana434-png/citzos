import { NextRequest, NextResponse } from 'next/server';

/**
 * Validates a 12-digit Indian Aadhaar number using standard Verhoeff algorithm.
 */
function validateVerhoeff(aadhaar: string): boolean {
  if (!/^\d{12}$/.test(aadhaar)) return false;

  const d = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
  ];

  const p = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
  ];

  let c = 0;
  const invertedArray = aadhaar.split('').map(Number).reverse();

  for (let i = 0; i < invertedArray.length; i++) {
    c = d[c][p[i % 8][invertedArray[i]]];
  }

  return c === 0;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawAadhaar = body.aadhaarNumber || '';
    const cleanAadhaar = String(rawAadhaar).replace(/[\s-]/g, '').trim();

    // 1. Strict 12-digit Format Validation
    if (!cleanAadhaar || cleanAadhaar.length !== 12 || !/^\d{12}$/.test(cleanAadhaar)) {
      return NextResponse.json(
        { success: false, message: 'कृपया 12 अंकों का वैध आधार नंबर दर्ज करें।' },
        { status: 400 }
      );
    }

    // 2. Aadhaar Cannot Start with 0 or 1 per UIDAI Standard
    if (cleanAadhaar.startsWith('0') || cleanAadhaar.startsWith('1')) {
      return NextResponse.json(
        { success: false, message: 'अमान्य आधार नंबर। यूआईडीएआई नियमानुसार आधार 0 या 1 से शुरू नहीं हो सकता।' },
        { status: 400 }
      );
    }

    // 3. Mathematical Verhoeff Checksum
    const isVerhoeffValid = validateVerhoeff(cleanAadhaar);
    if (!isVerhoeffValid) {
      return NextResponse.json(
        { success: false, message: 'अमान्य आधार नंबर। कृपया अपने आधार कार्ड पर छपा सही 12 अंकों का नंबर जांचें।' },
        { status: 400 }
      );
    }

    const lastFour = cleanAadhaar.slice(-4);
    const maskedAadhaar = `XXXX-XXXX-${lastFour}`;

    // 4. Primary Provider: Cashfree Verification Suite (Live UIDAI Gateway)
    const cashfreeAppId = process.env.CASHFREE_APP_ID;
    const cashfreeSecret = process.env.CASHFREE_SECRET_KEY;
    const isCashfreeTest = (process.env.CASHFREE_ENV || 'TEST').toUpperCase() === 'TEST';

    if (cashfreeAppId && cashfreeSecret && cashfreeAppId !== 'YOUR_CASHFREE_APP_ID') {
      try {
        const cashfreeBase = isCashfreeTest
          ? 'https://sandbox.cashfree.com/verification'
          : 'https://api.cashfree.com/verification';

        const cfRes = await fetch(`${cashfreeBase}/offline-aadhaar/otp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-client-id': cashfreeAppId,
            'x-client-secret': cashfreeSecret,
          },
          body: JSON.stringify({ aadhaar_number: cleanAadhaar }),
        });

        const cfData = await cfRes.json();
        if (cfData && (cfData.status === 'SUCCESS' || cfData.ref_id)) {
          return NextResponse.json({
            success: true,
            provider: 'Cashfree UIDAI Gateway',
            referenceId: cfData.ref_id,
            maskedMobile: cfData.message?.includes('ending') 
              ? cfData.message 
              : `आधार से लिंक मोबाइल (...${lastFour})`,
            message: `यूआईडीएआई द्वारा आधिकारिक ओटीपी आपके आधार लिंक मोबाइल पर सफलतापूर्वक भेज दिया गया है।`,
            messageEn: `Official UIDAI OTP dispatched to registered mobile number.`,
          });
        } else {
          const errMsg = cfData.message || 'यूआईडीएआई सर्वर से ओटीपी भेजने में विफलता। कृपया पुनः प्रयास करें।';
          return NextResponse.json({ success: false, message: errMsg }, { status: 400 });
        }
      } catch (cfErr: any) {
        console.error('Cashfree Aadhaar dispatch error:', cfErr);
      }
    }

    // 5. Secondary Provider: Surepass Identity Gateway
    const surepassToken = process.env.SUREPASS_TOKEN;
    if (surepassToken && surepassToken !== 'YOUR_SUREPASS_TOKEN') {
      try {
        const spRes = await fetch('https://kyc.surepass.io/api/v1/aadhaar-v2/generate-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${surepassToken}`,
          },
          body: JSON.stringify({ id_number: cleanAadhaar }),
        });

        const spData = await spRes.json();
        if (spData && spData.success && spData.data?.client_id) {
          return NextResponse.json({
            success: true,
            provider: 'Surepass UIDAI Gateway',
            referenceId: spData.data.client_id,
            maskedMobile: `आधार से लिंक मोबाइल (...${lastFour})`,
            message: `यूआईडीएआई द्वारा आधिकारिक ओटीपी आपके आधार लिंक मोबाइल पर भेज दिया गया है।`,
            messageEn: `Official UIDAI OTP dispatched to registered mobile number.`,
          });
        } else {
          return NextResponse.json(
            { success: false, message: spData.message || 'आधार सत्यापन विफल रहा।' },
            { status: 400 }
          );
        }
      } catch (spErr: any) {
        console.error('Surepass Aadhaar dispatch error:', spErr);
      }
    }

    // 6. No Live KYC Gateway API Configured
    return NextResponse.json(
      {
        success: false,
        requiresConfig: true,
        message: 'रियल आधार ओटीपी भेजने के लिए Cashfree या Surepass API कुंजी आवश्यक है। कृपया .env.local में CASHFREE_APP_ID और CASHFREE_SECRET_KEY सेट करें।',
        messageEn: 'Real Aadhaar OTP requires Cashfree or Surepass API keys configured in .env.local.',
      },
      { status: 503 }
    );
  } catch (error: any) {
    console.error('Aadhaar send OTP error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'सर्वर पर आधार अनुरोध विफल रहा।' },
      { status: 500 }
    );
  }
}
