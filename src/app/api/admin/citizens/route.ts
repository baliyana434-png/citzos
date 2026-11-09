import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService, CitizenRecord } from '@/lib/db';
import { AdminSecurityService } from '@/lib/security';

export type RegisteredCitizen = CitizenRecord;
import {
  validateRealName,
  validateRealPhone,
  validateRealAadhaar,
  validateRealDob,
  validateRealPincode,
  validateRealDistrict,
  validateRealIncome,
} from '@/utils/antiFraudValidation';

// SECURITY: Sovereign Admin Authorization (Signed token or server-only key)
function verifyAdminAuth(req: NextRequest): boolean {
  // 1. Check signed cryptographic admin session token
  const adminToken = req.headers.get('x-admin-token');
  if (adminToken && AdminSecurityService.verifyAdminToken(adminToken)) {
    return true;
  }

  // 2. Server-to-server API key (Only if ADMIN_API_KEY is configured in env)
  const adminKey = req.headers.get('x-admin-key');
  const serverAdminKey = process.env.ADMIN_API_KEY;
  if (serverAdminKey && adminKey && adminKey === serverAdminKey) {
    return true;
  }

  return false;
}

export async function GET(req: NextRequest) {
  if (!verifyAdminAuth(req)) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized. Admin authorization required.' },
      { status: 401 }
    );
  }

  try {
    // Read from unified DatabaseService (MongoDB Atlas with fallback to citizens_store.json)
    const citizens = await DatabaseService.getAllCitizens();
    
    // Sanitize records to exclude sensitive password hashes before returning
    const safeCitizens = citizens.map((c) => {
      const { passwordHash: _ph, passwordSalt: _ps, ...safe } = c;
      return safe;
    });

    return NextResponse.json({
      success: true,
      count: safeCitizens.length,
      citizens: safeCitizens,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const isAdmin = verifyAdminAuth(req);
  if (!isAdmin) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized. Admin authorization required.' },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();

    // 1. Anti-Fraud Name Validation
    const nameCheck = validateRealName(body.fullName);
    if (!nameCheck.valid) {
      return NextResponse.json(
        { success: false, message: nameCheck.error || 'अमान्य नाम।' },
        { status: 400 }
      );
    }

    // 2. Anti-Fraud Mobile Phone Validation
    const phoneCheck = validateRealPhone(body.phoneNumber);
    if (!phoneCheck.valid) {
      return NextResponse.json(
        { success: false, message: phoneCheck.error || 'अमान्य मोबाइल नंबर।' },
        { status: 400 }
      );
    }

    // 3. Anti-Fraud Aadhaar / National ID Validation
    let maskedAadhaar = body.aadhaarNumberMasked || '';
    if (body.aadhaarNumber) {
      const aadhaarCheck = validateRealAadhaar(body.aadhaarNumber);
      if (!aadhaarCheck.valid) {
        return NextResponse.json(
          { success: false, message: aadhaarCheck.error || 'अमान्य आधार नंबर।' },
          { status: 400 }
        );
      }
      maskedAadhaar = `XXXX-XXXX-${aadhaarCheck.cleanAadhaar.slice(-4)}`;
    }

    // 4. Anti-Fraud DOB & Age Verification
    let calculatedAge = Number(body.age) || 21;
    if (body.dob) {
      const dobCheck = validateRealDob(body.dob);
      if (!dobCheck.valid) {
        return NextResponse.json(
          { success: false, message: dobCheck.error || 'अमान्य जन्म तिथि।' },
          { status: 400 }
        );
      }
      calculatedAge = dobCheck.age;
    }

    // 5. Anti-Fraud Pincode Validation
    let cleanPincode = body.pincode || '';
    if (body.pincode) {
      const pinCheck = validateRealPincode(body.pincode);
      if (!pinCheck.valid) {
        return NextResponse.json(
          { success: false, message: pinCheck.error || 'अमान्य पिनकोड।' },
          { status: 400 }
        );
      }
      cleanPincode = pinCheck.cleanPincode;
    }

    // 6. Anti-Fraud District Validation
    if (body.district) {
      const distCheck = validateRealDistrict(body.district);
      if (!distCheck.valid) {
        return NextResponse.json(
          { success: false, message: distCheck.error || 'अमान्य जिला।' },
          { status: 400 }
        );
      }
    }

    // 7. Anti-Fraud Income Validation
    if (body.familyIncomeAnnual !== undefined && body.familyIncomeAnnual !== null) {
      const incomeCheck = validateRealIncome(body.familyIncomeAnnual);
      if (!incomeCheck.valid) {
        return NextResponse.json(
          { success: false, message: incomeCheck.error || 'अमान्य वार्षिक आय।' },
          { status: 400 }
        );
      }
    }

    const cleanPhone = phoneCheck.cleanPhone;
    const existing = await DatabaseService.findCitizen({ phone: cleanPhone });

    const newCitizen: CitizenRecord = {
      id: body.id || (existing ? existing.id : 'cit-' + Date.now()),
      fullName: body.fullName.trim(),
      email: body.email?.trim().toLowerCase() || existing?.email || '',
      phoneNumber: cleanPhone,
      aadhaarNumberMasked: maskedAadhaar || existing?.aadhaarNumberMasked || '',
      nationalIdMasked: maskedAadhaar || existing?.nationalIdMasked || '',
      age: calculatedAge,
      dob: body.dob || existing?.dob || '',
      gender: body.gender || existing?.gender || 'male',
      state: body.state || existing?.state || '',
      administrativeDivision: body.administrativeDivision || body.state || existing?.administrativeDivision || '',
      district: body.district ? body.district.trim() : existing?.district || '',
      pincode: cleanPincode,
      lifePhase: body.lifePhase || existing?.lifePhase || 'college_student',
      casteCategory: body.casteCategory || existing?.casteCategory || 'General',
      familyIncomeAnnual: Number(body.familyIncomeAnnual) || existing?.familyIncomeAnnual || 0,
      photoURL: body.photoURL || existing?.photoURL || undefined,
      registeredAt: existing?.registeredAt || new Date().toISOString(),
      status: 'verified',
      isOnboarded: true,
      isAadhaarVerified: true,
      country: body.country || existing?.country || 'IN',
    };

    const saved = await DatabaseService.saveCitizen(newCitizen);
    const { passwordHash: _ph, passwordSalt: _ps, ...safeCitizen } = saved;

    return NextResponse.json({
      success: true,
      message: 'नागरिक विवरण सफलतापूर्वक सुरक्षित हो गया।',
      citizen: safeCitizen,
    });
  } catch (error: any) {
    console.error('Admin Citizens API error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'नागरिक डेटा सुरक्षित करने में विफलता।' },
      { status: 500 }
    );
  }
}
