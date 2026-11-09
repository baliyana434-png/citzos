import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService, CitizenRecord } from '@/lib/db';
import { SessionSecurityService } from '@/lib/security';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get('phone')?.replace(/\D/g, '').slice(-10);
    const email = searchParams.get('email')?.trim().toLowerCase();

    if (!phone && !email) {
      return NextResponse.json(
        { success: false, message: 'फोन नंबर या ईमेल प्रदान करना आवश्यक है।' },
        { status: 400 }
      );
    }

    const matchingCitizen = await DatabaseService.findCitizen({ email, phone });

    if (!matchingCitizen) {
      return NextResponse.json(
        { success: false, message: 'नागरिक प्रोफाइल नहीं मिला।' },
        { status: 404 }
      );
    }

    // Read saved favorites for this citizen
    const key = phone || email || matchingCitizen.id;
    const citizenFavorites = await DatabaseService.getFavorites(key);

    // SECURITY: Never leak password hash or salt to client
    const { passwordHash: _ph, passwordSalt: _ps, ...safeCitizen } = matchingCitizen;

    return NextResponse.json({
      success: true,
      citizen: safeCitizen,
      favorites: citizenFavorites,
    });
  } catch (error: any) {
    console.error('Citizen profile fetch error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'प्रोफाइल लोड करने में त्रुटि।' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const phone = body.phoneNumber ? String(body.phoneNumber).replace(/\D/g, '').slice(-10) : '';
    const email = body.email ? String(body.email).trim().toLowerCase() : '';

    if (!phone && !email && !body.id) {
      return NextResponse.json(
        { success: false, message: 'फोन नंबर या ईमेल अनिवार्य है।' },
        { status: 400 }
      );
    }

    // Check if citizen already exists
    const existing = await DatabaseService.findCitizen({ email, phone, id: body.id });

    // Optional Session verification: if token provided in Authorization header, ensure it matches
    const authHeader = req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      const session = SessionSecurityService.verifySessionToken(token);
      if (!session.valid) {
        return NextResponse.json(
          { success: false, message: 'सत्र समाप्त या अमान्य है। कृपया पुनः लॉगिन करें।' },
          { status: 401 }
        );
      }
    }

    const citizenRecord: CitizenRecord = {
      id: existing?.id || body.id || 'cit-' + Date.now(),
      fullName: body.fullName || existing?.fullName || 'Citizen',
      email: email || existing?.email || '',
      phoneNumber: phone || existing?.phoneNumber || '',
      country: body.country || existing?.country || 'IN',
      nationalIdName: body.nationalIdName || existing?.nationalIdName || undefined,
      nationalIdMasked: body.nationalIdMasked || existing?.nationalIdMasked || undefined,
      aadhaarNumberMasked: body.aadhaarNumberMasked || existing?.aadhaarNumberMasked || undefined,
      aadhaarNumber: body.aadhaarNumber || existing?.aadhaarNumber || undefined,
      age: Number(body.age) || existing?.age || 21,
      dob: body.dob || existing?.dob || undefined,
      gender: body.gender || existing?.gender || 'male',
      state: body.state || existing?.state || '',
      administrativeDivision: body.administrativeDivision || existing?.administrativeDivision || undefined,
      district: body.district || existing?.district || '',
      pincode: body.pincode || existing?.pincode || '',
      lifePhase: body.lifePhase || existing?.lifePhase || 'college_student',
      casteCategory: body.casteCategory || existing?.casteCategory || 'General',
      familyIncomeAnnual: Number(body.familyIncomeAnnual) || existing?.familyIncomeAnnual || 0,
      educationLevel: body.educationLevel || body.qualification || existing?.educationLevel || 'graduate',
      qualification: body.qualification || body.educationLevel || existing?.qualification || 'graduate',
      photoURL: body.photoURL || existing?.photoURL || undefined,
      registeredAt: existing?.registeredAt || new Date().toISOString(),
      status: 'verified',
      isOnboarded: Boolean(body.dob || existing?.dob) && (body.isOnboarded !== undefined ? Boolean(body.isOnboarded) : (existing?.isOnboarded ?? false)),
      // SECURITY: Preserve existing password credentials, never allow client-side tampering
      passwordHash: existing?.passwordHash,
      passwordSalt: existing?.passwordSalt,
      // SECURITY: Subscription status cannot be granted via generic profile update
      subscription: existing?.subscription || undefined,
    };

    const saved = await DatabaseService.saveCitizen(citizenRecord);

    // Save favorites if provided in body
    if (Array.isArray(body.favorites)) {
      const favKey = phone || email || saved.id;
      await DatabaseService.saveFavorites(favKey, body.favorites);
    }

    // Never leak passwordHash or salt
    const { passwordHash: _ph, passwordSalt: _ps, ...safeCitizen } = saved;

    return NextResponse.json({
      success: true,
      message: 'प्रोफाइल सफलतापूर्वक सुरक्षित हो गई।',
      citizen: safeCitizen,
    });
  } catch (error: any) {
    console.error('Citizen profile update error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'प्रोफाइल सुरक्षित करने में विफलता।' },
      { status: 500 }
    );
  }
}
