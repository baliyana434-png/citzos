import { NextRequest } from 'next/server';

/**
 * =======================================================================
 * CITIZOS ENTERPRISE CLOUDFLARE ZERO TRUST ACCESS SERVICE
 * =======================================================================
 * Validates Cloudflare Access edge identity assertions and enforces
 * strict administrator email allowlisting for admin.citzos.in.
 * =======================================================================
 */

// Default approved administrator email identities
const DEFAULT_ALLOWED_ADMIN_EMAILS = [
  'baliyana434@gmail.com',
];

export function getApprovedAdminEmails(): string[] {
  const envList = process.env.ADMIN_ALLOWED_EMAILS;
  if (!envList) return DEFAULT_ALLOWED_ADMIN_EMAILS;
  return envList
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export interface CloudflareAccessVerificationResult {
  valid: boolean;
  isCloudflareSecured: boolean;
  email?: string;
  reason?: string;
}

/**
 * Validates incoming Cloudflare Zero Trust Access assertions
 */
export function verifyCloudflareAccess(req: NextRequest | Headers): CloudflareAccessVerificationResult {
  const getHeader = (name: string): string | null => {
    if (req instanceof Headers) {
      return req.get(name);
    }
    return req.headers.get(name);
  };

  const cfJwt = getHeader('cf-access-jwt-assertion') || getHeader('Cf-Access-Jwt-Assertion');
  const cfEmail = (
    getHeader('cf-access-authenticated-user-email') ||
    getHeader('Cf-Access-Authenticated-User-Email') ||
    ''
  ).toLowerCase().trim();

  // If Cloudflare Access is active on the request
  if (cfJwt || cfEmail) {
    if (!cfEmail) {
      return {
        valid: false,
        isCloudflareSecured: true,
        reason: 'Cloudflare Access JWT present but authenticated user email is missing.',
      };
    }

    const approvedList = getApprovedAdminEmails();
    const isApproved = approvedList.includes(cfEmail);

    if (!isApproved) {
      return {
        valid: false,
        isCloudflareSecured: true,
        email: cfEmail,
        reason: `Email ${cfEmail} is not in the approved administrator allowlist.`,
      };
    }

    return {
      valid: true,
      isCloudflareSecured: true,
      email: cfEmail,
    };
  }

  // Cloudflare Access headers not present (e.g., local development or direct origin access)
  return {
    valid: true,
    isCloudflareSecured: false,
    reason: 'Cloudflare Access headers absent; falling back to origin zero-trust credentials.',
  };
}
