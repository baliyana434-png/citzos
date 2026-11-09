import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const referenceId = String(body.referenceId || '').trim();
    const otp = String(body.otp || '').replace(/\D/g, '').trim();
    const rawAadhaar = String(body.aadhaarNumber || '').replace(/[\s-]/g, '').trim();

    if (!referenceId) {
      return NextResponse.json(
        { success: false, message: 'सत्यापन संदर्भ संख्या (Reference ID) अनुपलब्ध है।' },
        { status: 400 }
      );
    }

    if (!otp || otp.length < 6) {
      return NextResponse.json(
        { success: false, message: 'कृपया 6 अंकों का वैध यूआईडीएआई ओटीपी दर्ज करें।' },
        { status: 400 }
      );
    }

    const maskedAadhaar = rawAadhaar.length === 12 
      ? `XXXX-XXXX-${rawAadhaar.slice(-4)}`
      : 'XXXX-XXXX-UIDAI';

    // 1. Cashfree Verification Suite
    const cashfreeAppId = process.env.CASHFREE_APP_ID;
    const cashfreeSecret = process.env.CASHFREE_SECRET_KEY;
    const isCashfreeTest = (process.env.CASHFREE_ENV || 'TEST').toUpperCase() === 'TEST';

    if (cashfreeAppId && cashfreeSecret && cashfreeAppId !== 'YOUR_CASHFREE_APP_ID') {
      try {
        const cashfreeBase = isCashfreeTest
          ? 'https://sandbox.cashfree.com/verification'
          : 'https://api.cashfree.com/verification';

        const cfRes = await fetch(`${cashfreeBase}/offline-aadhaar/verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-client-id': cashfreeAppId,
            'x-client-secret': cashfreeSecret,
          },
          body: JSON.stringify({
            ref_id: referenceId,
            otp: otp,
          }),
        });

        const cfData = await cfRes.json();
        if (cfData && (cfData.status === 'VALID' || cfData.status === 'SUCCESS')) {
          const splitAddress = cfData.split_address || {};
          const rawGender = String(cfData.gender || '').toLowerCase();
          const gender: 'male' | 'female' | 'other' = rawGender.startsWith('m')
            ? 'male'
            : rawGender.startsWith('f')
            ? 'female'
            : 'other';

          let formattedDob = cfData.dob || '';
          if (/^\d{2}-\d{2}-\d{4}$/.test(formattedDob)) {
            const [d, m, y] = formattedDob.split('-');
            formattedDob = `${y}-${m}-${d}`;
          }

          return NextResponse.json({
            success: true,
            isVerified: true,
            provider: 'Cashfree UIDAI Gateway',
            maskedAadhaar,
            verifiedName: cfData.name || 'Citizen',
            verifiedDob: formattedDob,
            verifiedGender: gender,
            verifiedState: splitAddress.state || cfData.state || 'India',
            verifiedDistrict: splitAddress.dist || cfData.district || '',
            verifiedPincode: splitAddress.pincode || cfData.pincode || '',
            message: 'आधार पहचान यूआईडीएआई द्वारा शत-प्रतिशत प्रमाणित हो गई है।',
            messageEn: 'Aadhaar identity successfully authenticated via UIDAI server.',
          });
        } else {
          return NextResponse.json(
            {
              success: false,
              message: cfData.message || 'अमान्य ओटीपी कोड। कृपया अपने मोबाइल पर आया सही 6-अंकीय कोड दर्ज करें।',
            },
            { status: 400 }
          );
        }
      } catch (cfErr: any) {
        console.error('Cashfree verify error:', cfErr);
      }
    }

    // 2. Surepass Identity Gateway
    const surepassToken = process.env.SUREPASS_TOKEN;
    if (surepassToken && surepassToken !== 'YOUR_SUREPASS_TOKEN') {
      try {
        const spRes = await fetch('https://kyc.surepass.io/api/v1/aadhaar-v2/submit-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${surepassToken}`,
          },
          body: JSON.stringify({
            client_id: referenceId,
            otp: otp,
          }),
        });

        const spData = await spRes.json();
        if (spData && spData.success && spData.data) {
          const d = spData.data;
          const rawGender = String(d.gender || '').toLowerCase();
          const gender: 'male' | 'female' | 'other' = rawGender.startsWith('m')
            ? 'male'
            : rawGender.startsWith('f')
            ? 'female'
            : 'other';

          return NextResponse.json({
            success: true,
            isVerified: true,
            provider: 'Surepass UIDAI Gateway',
            maskedAadhaar,
            verifiedName: d.full_name || 'Citizen',
            verifiedDob: d.dob || '',
            verifiedGender: gender,
            verifiedState: d.address?.state || 'India',
            verifiedDistrict: d.address?.dist || '',
            verifiedPincode: d.address?.zip || '',
            message: 'आधार पहचान यूआईडीएआई द्वारा शत-प्रतिशत प्रमाणित हो गई है।',
            messageEn: 'Aadhaar identity successfully authenticated via UIDAI server.',
          });
        } else {
          return NextResponse.json(
            {
              success: false,
              message: spData.message || 'अमान्य ओटीपी कोड। कृपया सही कोड दर्ज करें।',
            },
            { status: 400 }
          );
        }
      } catch (spErr: any) {
        console.error('Surepass verify error:', spErr);
      }
    }

    return NextResponse.json(
      {
        success: false,
        requiresConfig: true,
        message: 'रियल आधार सत्यापन के लिए Cashfree या Surepass API कुंजी आवश्यक है।',
      },
      { status: 503 }
    );
  } catch (error: any) {
    console.error('Aadhaar verify OTP error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'आधार सत्यापन सर्वर त्रुटि।' },
      { status: 500 }
    );
  }
}
