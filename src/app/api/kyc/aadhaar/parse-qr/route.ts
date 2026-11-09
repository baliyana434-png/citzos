import { NextResponse } from 'next/server';
import zlib from 'zlib';
import { parseAadhaarQrText, ParsedAadhaarData } from '@/utils/aadhaarQrParser';
import { calculateExactAge } from '@/utils/antiFraudValidation';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { qrText } = await req.json();

    if (!qrText || typeof qrText !== 'string') {
      return NextResponse.json(
        { success: false, error: 'QR data is missing or invalid' },
        { status: 400 }
      );
    }

    const trimmed = qrText.trim();

    // 1. Try standard text/XML/JSON parser first
    const directParsed = parseAadhaarQrText(trimmed);
    if (directParsed) {
      return NextResponse.json({
        success: true,
        data: directParsed,
      });
    }

    // 2. Try V2/V3 Secure QR Code (BigInt compressed binary stream)
    if (/^\d{50,}$/.test(trimmed)) {
      try {
        const bigInt = BigInt(trimmed);
        let hex = bigInt.toString(16);
        if (hex.length % 2 !== 0) hex = '0' + hex;

        const buffer = Buffer.from(hex, 'hex');
        const decompressed = zlib.inflateSync(buffer);

        // Decompressed buffer uses 255 (0xFF) as field delimiter
        const parts: string[] = [];
        let current: number[] = [];

        for (let i = 0; i < decompressed.length; i++) {
          const byte = decompressed[i];
          if (byte === 255 || byte === 0) {
            if (current.length > 0) {
              parts.push(Buffer.from(current).toString('utf-8'));
              current = [];
            }
          } else {
            current.push(byte);
          }
        }
        if (current.length > 0) {
          parts.push(Buffer.from(current).toString('utf-8'));
        }

        if (parts.length >= 4) {
          // Standard UIDAI fields order
          // parts[0] = email/mobile flag, parts[1] = ref id, parts[2] = name, parts[3] = dob, parts[4] = gender
          const refId = parts[1] || '';
          const name = parts[2] || '';
          const dobRaw = parts[3] || '';
          const genderRaw = (parts[4] || '').toUpperCase();
          const dist = parts[6] || parts[5] || '';
          const rawPincode = parts[parts.length - 2] || parts[parts.length - 1] || '';
          const state = parts[parts.length - 1] || '';

          // Format DOB (DD-MM-YYYY to YYYY-MM-DD)
          const dobParts = dobRaw.split(/[\-\/]/);
          let formattedDob = '';
          let age = 0;
          if (dobParts.length === 3) {
            const parsedYear = parseInt(dobParts[2], 10);
            if (!isNaN(parsedYear)) {
              formattedDob = `${dobParts[2]}-${dobParts[1].padStart(2, '0')}-${dobParts[0].padStart(2, '0')}`;
              age = calculateExactAge(formattedDob);
            }
          }

          const parsedData: ParsedAadhaarData = {
            fullName: name,
            aadhaarNumberMasked: refId.length >= 4 ? `XXXX-XXXX-${refId.slice(-4)}` : 'XXXX-XXXX-0000',
            dob: formattedDob,
            age,
            gender: genderRaw.startsWith('F') ? 'female' : 'male',
            district: dist,
            state: state,
            pincode: rawPincode.replace(/\D/g, '').slice(0, 6) || '',
            rawSource: 'SECURE_QR_V2',
          };

          return NextResponse.json({
            success: true,
            data: parsedData,
          });
        }
      } catch (decompError: any) {
        console.warn('V2 Decompression attempt error:', decompError?.message);
      }
    }

    return NextResponse.json({
      success: false,
      error: 'Aadhaar QR format could not be decoded. Please ensure image has clear UIDAI QR code.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to parse QR' },
      { status: 500 }
    );
  }
}
