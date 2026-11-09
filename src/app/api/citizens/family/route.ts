import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/db';
import { validateRealName } from '@/utils/antiFraudValidation';

export interface StoredFamilyMember {
  id: string;
  citizenPhone?: string;
  citizenEmail?: string;
  relation: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  lifePhase: string;
  isAadhaarVerified?: boolean;
  createdAt: string;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get('phone')?.replace(/\D/g, '').slice(-10);
    const email = searchParams.get('email')?.trim().toLowerCase();

    if (!phone && !email) {
      return NextResponse.json(
        { success: false, message: 'फोन नंबर या ईमेल आवश्यक है।' },
        { status: 400 }
      );
    }

    // Verify citizen actually exists
    const citizen = await DatabaseService.findCitizen({ email, phone });
    if (!citizen) {
      return NextResponse.json(
        { success: false, message: 'नागरिक प्रोफाइल नहीं मिला।' },
        { status: 404 }
      );
    }

    const familyMembers = await DatabaseService.getFamilyMembers({ email, phone });

    return NextResponse.json({
      success: true,
      familyMembers,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const phone = String(body.citizenPhone || '').replace(/\D/g, '').slice(-10);
    const email = String(body.citizenEmail || '').trim().toLowerCase();

    if (!phone && !email) {
      return NextResponse.json(
        { success: false, message: 'नागरिक फोन नंबर या ईमेल आवश्यक है।' },
        { status: 400 }
      );
    }

    // Authorization: Verify citizen exists
    const citizen = await DatabaseService.findCitizen({ email, phone });
    if (!citizen) {
      return NextResponse.json(
        { success: false, message: 'अनाधिकृत: नागरिक खाता अस्तित्व में नहीं है।' },
        { status: 403 }
      );
    }

    // Name anti-fraud validation
    const nameCheck = validateRealName(body.name);
    if (!nameCheck.valid) {
      return NextResponse.json(
        { success: false, message: nameCheck.error || 'अमान्य नाम।' },
        { status: 400 }
      );
    }

    const age = Number(body.age);
    if (isNaN(age) || age < 1 || age > 115) {
      return NextResponse.json(
        { success: false, message: 'कृपया 1 से 115 वर्ष के बीच वैध आयु दर्ज करें।' },
        { status: 400 }
      );
    }

    const validRelations = ['father', 'mother', 'spouse', 'son', 'daughter', 'brother', 'sister', 'grandparent', 'other'];
    const relation = validRelations.includes(body.relation) ? body.relation : 'other';
    const memberId = body.id || `fam-${Date.now()}`;

    const newMember: StoredFamilyMember = {
      id: memberId,
      citizenPhone: phone || undefined,
      citizenEmail: email || undefined,
      relation,
      name: body.name.trim(),
      age,
      gender: body.gender || 'male',
      lifePhase: body.lifePhase || (age < 18 ? 'school_student' : age > 60 ? 'senior_citizen' : 'employed'),
      isAadhaarVerified: Boolean(body.isAadhaarVerified),
      createdAt: new Date().toISOString(),
    };

    await DatabaseService.saveFamilyMember(newMember);
    const updatedFamily = await DatabaseService.getFamilyMembers({ email, phone });

    return NextResponse.json({
      success: true,
      message: 'परिवार का सदस्य सफलतापूर्वक जोड़ दिया गया।',
      member: newMember,
      familyMembers: updatedFamily,
    });
  } catch (error: any) {
    console.error('Add family member error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'सदस्य जोड़ने में त्रुटि।' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const phone = searchParams.get('phone')?.replace(/\D/g, '').slice(-10);
    const email = searchParams.get('email')?.trim().toLowerCase();

    if (!id || (!phone && !email)) {
      return NextResponse.json(
        { success: false, message: 'सदस्य आईडी और फोन नंबर या ईमेल आवश्यक हैं।' },
        { status: 400 }
      );
    }

    // Authorization: Verify citizen exists
    const citizen = await DatabaseService.findCitizen({ email, phone });
    if (!citizen) {
      return NextResponse.json(
        { success: false, message: 'अनाधिकृत अनुरोध।' },
        { status: 403 }
      );
    }

    await DatabaseService.deleteFamilyMember(id, { email, phone });
    const updatedFamily = await DatabaseService.getFamilyMembers({ email, phone });

    return NextResponse.json({
      success: true,
      message: 'परिवार का सदस्य हटा दिया गया।',
      familyMembers: updatedFamily,
    });
  } catch (error: any) {
    console.error('Delete family member error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'सदस्य हटाने में त्रुटि।' },
      { status: 500 }
    );
  }
}
