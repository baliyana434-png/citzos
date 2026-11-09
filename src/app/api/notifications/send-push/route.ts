import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

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

interface ServiceAccountKey {
  project_id?: string;
  client_email?: string;
  private_key?: string;
}

const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const defaultTokensFile = path.join(process.cwd(), 'src', 'data', 'push_tokens.json');
const serverlessTokensFile = '/tmp/push_tokens.json';

async function readTokens(): Promise<StoredPushToken[]> {
  const filePath = isServerless ? serverlessTokensFile : defaultTokensFile;
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    if (isServerless) {
      try {
        const bundle = await fs.readFile(defaultTokensFile, 'utf-8');
        const parsed = JSON.parse(bundle);
        return Array.isArray(parsed) ? parsed : [];
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

function getServiceAccount(): ServiceAccountKey | null {
  const envKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY || process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!envKey) return null;

  try {
    if (envKey.trim().startsWith('{')) {
      return JSON.parse(envKey);
    }
    if (!envKey.includes('\n') && envKey.length > 100 && !envKey.endsWith('.json')) {
      try {
        const decoded = Buffer.from(envKey, 'base64').toString('utf-8');
        if (decoded.trim().startsWith('{')) {
          return JSON.parse(decoded);
        }
      } catch {}
    }
  } catch (e) {
    console.warn('Error parsing service account key from env:', e);
  }
  return null;
}

async function getGoogleOAuthAccessToken(serviceAccount: ServiceAccountKey): Promise<string | null> {
  if (!serviceAccount.client_email || !serviceAccount.private_key) return null;

  try {
    const now = Math.floor(Date.now() / 1000);
    const header = { alg: 'RS256', typ: 'JWT' };
    const claimSet = {
      iss: serviceAccount.client_email,
      scope: 'https://www.googleapis.com/auth/firebase.messaging',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    };

    const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
    const encodedClaimSet = Buffer.from(JSON.stringify(claimSet)).toString('base64url');
    const signatureInput = `${encodedHeader}.${encodedClaimSet}`;

    const signer = crypto.createSign('RSA-SHA256');
    signer.update(signatureInput);
    const signature = signer.sign(serviceAccount.private_key, 'base64url');

    const jwt = `${signatureInput}.${signature}`;

    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Failed to exchange JWT for Google access token:', errText);
      return null;
    }

    const data = await res.json();
    return data.access_token || null;
  } catch (err) {
    console.error('Error generating Google OAuth access token:', err);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const title = String(body.title || 'Citzos — नया अवसर अलर्ट').trim();
    const message = String(body.body || body.message || 'नई सरकारी योजना व भर्ती का नोटिफिकेशन उपलब्ध है।').trim();
    const targetUrl = String(body.url || '/').trim();
    const specificToken = body.token ? String(body.token).trim() : undefined;

    const storedTokens = await readTokens();
    const tokensToTarget = specificToken
      ? [{ token: specificToken, registeredAt: new Date().toISOString(), lastActiveAt: new Date().toISOString() }]
      : storedTokens;

    if (tokensToTarget.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'कोई पंजीकृत डिवाइस टोकन नहीं मिला। कृपया पहले वेबसाइट पर नोटिफिकेशन चालू करें।',
      }, { status: 404 });
    }

    const serviceAccount = getServiceAccount();
    const projectId = serviceAccount?.project_id || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'lifeos-7a6f1';

    let successCount = 0;
    let failureCount = 0;
    const deadTokens = new Set<string>();

    if (serviceAccount) {
      const accessToken = await getGoogleOAuthAccessToken(serviceAccount);
      if (accessToken) {
        await Promise.allSettled(
          tokensToTarget.map(async (item) => {
            try {
              const res = await fetch(`https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  message: {
                    token: item.token,
                    notification: {
                      title,
                      body: message,
                    },
                    webpush: {
                      notification: {
                        title,
                        body: message,
                        icon: '/icon.png',
                        badge: '/icon.png',
                      },
                      fcm_options: {
                        link: targetUrl,
                      },
                    },
                    data: {
                      title,
                      body: message,
                      url: targetUrl,
                    },
                  },
                }),
              });

              if (res.ok) {
                successCount++;
              } else {
                failureCount++;
                const errData = await res.json().catch(() => null);
                const errCode = errData?.error?.details?.[0]?.errorCode;
                if (errCode === 'UNREGISTERED' || res.status === 404) {
                  deadTokens.add(item.token);
                }
              }
            } catch (dispatchErr) {
              failureCount++;
            }
          })
        );

        if (deadTokens.size > 0 && !specificToken) {
          const freshTokens = storedTokens.filter((t) => !deadTokens.has(t.token));
          await writeTokens(freshTokens);
        }

        return NextResponse.json({
          success: true,
          mode: 'fcm_v1_live',
          message: `FCM v1: ${successCount} डिवाइस पर नोटिफिकेशन सफलतापूर्वक भेजा गया।${deadTokens.size > 0 ? ` (${deadTokens.size} निष्क्रीय टोकन हटा दिए गए)` : ''}`,
          recipientsCount: tokensToTarget.length,
          deliveredCount: successCount,
          failedCount: failureCount,
          prunedCount: deadTokens.size,
          payload: { title, body: message, url: targetUrl },
        });
      }
    }

    return NextResponse.json({
      success: true,
      mode: 'ready_queued',
      message: `पुश ब्रॉडकास्ट ${tokensToTarget.length} पंजीकृत डिवाइस(ज) के लिए तैयार है।`,
      recipientsCount: tokensToTarget.length,
      note: 'Server dispatch is active. Connect FIREBASE_SERVICE_ACCOUNT_KEY in .env.local to enable direct background FCM cloud push when browser is closed.',
      payload: { title, body: message, url: targetUrl },
    });
  } catch (error: any) {
    console.error('Send push error:', error);
    return NextResponse.json({
      success: false,
      message: error?.message || 'Failed to dispatch push notification.',
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const tokens = await readTokens();
    const serviceAccount = getServiceAccount();
    return NextResponse.json({
      success: true,
      registeredDeviceCount: tokens.length,
      isFcmServerConfigured: Boolean(serviceAccount),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'lifeos-7a6f1',
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
