import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { DatabaseService } from '@/lib/db';

const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const defaultTokensFile = path.join(process.cwd(), 'src', 'data', 'push_tokens.json');
const serverlessTokensFile = '/tmp/push_tokens.json';

interface StoredPushToken {
  token: string;
  email?: string;
  phone?: string;
  citizenId?: string;
  country?: string;
  userAgent?: string;
  registeredAt: string;
  lastActiveAt: string;
}

async function readTokens(): Promise<StoredPushToken[]> {
  const filePath = isServerless ? serverlessTokensFile : defaultTokensFile;
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    if (isServerless) {
      try {
        const bundle = await fs.readFile(defaultTokensFile, 'utf-8');
        const parsed = JSON.parse(bundle);
        try { await fs.writeFile(serverlessTokensFile, bundle, 'utf-8'); } catch {}
        return parsed;
      } catch {}
    }
    return [];
  }
}

async function writeTokens(tokens: StoredPushToken[]): Promise<void> {
  const filePath = isServerless ? serverlessTokensFile : defaultTokensFile;
  try {
    await fs.writeFile(filePath, JSON.stringify(tokens, null, 2), 'utf-8');
  } catch (err) {
    console.warn(`Local store file write note (${filePath}):`, err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const token = String(body.token || '').trim();

    if (!token || token.length < 10) {
      return NextResponse.json(
        { success: false, message: 'Invalid or missing device token.' },
        { status: 400 }
      );
    }

    const email = body.email ? String(body.email).trim().toLowerCase() : undefined;
    const phone = body.phone ? String(body.phone).replace(/\D/g, '').slice(-10) : undefined;
    const citizenId = body.citizenId ? String(body.citizenId).trim() : undefined;
    const country = body.country ? String(body.country).trim() : 'IN';
    const userAgent = body.userAgent ? String(body.userAgent).slice(0, 200) : undefined;

    const tokens = await readTokens();
    const now = new Date().toISOString();

    const existingIndex = tokens.findIndex((t) => t.token === token);
    const tokenRecord: StoredPushToken = {
      token,
      email,
      phone,
      citizenId,
      country,
      userAgent,
      registeredAt: existingIndex >= 0 ? tokens[existingIndex].registeredAt : now,
      lastActiveAt: now,
    };

    if (existingIndex >= 0) {
      tokens[existingIndex] = tokenRecord;
    } else {
      tokens.unshift(tokenRecord);
    }

    await writeTokens(tokens);

    // If citizen is identified, enable their webPush flag in database
    if (email || phone || citizenId) {
      try {
        const citizen = await DatabaseService.findCitizen({ email, phone, id: citizenId });
        if (citizen) {
          citizen.notificationsEnabled = {
            ...citizen.notificationsEnabled,
            webPush: true,
          };
          await DatabaseService.saveCitizen(citizen);
        }
      } catch (dbErr) {
        console.warn('Could not update citizen webPush preference:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Device push notification token registered successfully.',
      registeredCount: tokens.length,
    });
  } catch (error: any) {
    console.error('Token registration error:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Server error saving push token.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const tokens = await readTokens();
    return NextResponse.json({
      success: true,
      count: tokens.length,
      // Mask tokens for privacy
      sampleCount: tokens.length,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
