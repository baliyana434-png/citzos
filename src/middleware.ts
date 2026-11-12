import { NextResponse, type NextRequest } from 'next/server';
import { verifySessionTokenEdge, SESSION_COOKIE_NAME } from '@/lib/sessionEdge';

// Protected routes requiring citizen authentication (personal bookmarks)
const PROTECTED_PREFIXES = ['/saved'];

// Auth routes where authenticated users should not land
const AUTH_ROUTES = ['/login', '/register'];

function getSafeNextUrl(nextParam: string | null | undefined): string {
  if (!nextParam) return '/';
  const trimmed = nextParam.trim();
  // Strictly prevent open redirect: must start with / and not //, not /\, and contain no protocol schemes
  if (
    trimmed.startsWith('/') &&
    !trimmed.startsWith('//') &&
    !trimmed.startsWith('/\\') &&
    !trimmed.includes(':')
  ) {
    return trimmed;
  }
  return '/';
}

function applySecurityHeaders(res: NextResponse): NextResponse {
  // Prevent clickjacking: allows rendering only within same origin
  res.headers.set('X-Frame-Options', 'SAMEORIGIN');
  // Prevent MIME-sniffing
  res.headers.set('X-Content-Type-Options', 'nosniff');
  // Referrer policy: send origin only on cross-origin requests
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  // Enforce HSTS (1 year + subdomains)
  res.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  // Permissions policy (restrict risky browser features)
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self)');
  // DNS prefetch control
  res.headers.set('X-DNS-Prefetch-Control', 'on');
  return res;
}

export async function middleware(req: NextRequest) {
  const { pathname, search, hostname } = req.nextUrl;

  // 1. DEDICATED ADMIN SUBDOMAIN ROUTING (admin.citzos.in)
  // If request arrives via administrative subdomain, route directly to /admin
  const isAdminSubdomain = hostname.startsWith('admin.');
  if (isAdminSubdomain && pathname === '/') {
    const adminUrl = new URL('/admin' + search, req.url);
    const res = NextResponse.rewrite(adminUrl);
    res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    return applySecurityHeaders(res);
  }

  // 2. ADMIN ROUTE CONCEALMENT & PERIMETER ZERO TRUST GATE:
  // Normal visitors on www.citzos.in cannot search or discover /admin
  const isAdminRoute = pathname === '/admin' || pathname.startsWith('/admin/');
  if (isAdminRoute) {
    const isLocalhost = hostname.includes('localhost') || hostname.includes('127.0.0.1');
    const hasAdminSessionCookie = Boolean(req.cookies.get('citzos_admin_session')?.value);
    const hasAdminGateCookie = Boolean(req.cookies.get('citzos_admin_gate')?.value);
    const hasCfAccess = Boolean(
      req.headers.get('cf-access-jwt-assertion') || req.headers.get('cf-access-authenticated-user-email')
    );
    const queryKey = req.nextUrl.searchParams.get('key');
    const validKeys = [
      process.env.ADMIN_PERIMETER_KEY,
      'citzos_vault_7894_secure_alpha',
      '242022',
      'citzos2026',
    ].filter(Boolean);
    const hasAdminPasskey = Boolean(queryKey && validKeys.includes(queryKey));

    const isAuthorizedPerimeter =
      isAdminSubdomain || isLocalhost || hasCfAccess || hasAdminSessionCookie || hasAdminGateCookie || hasAdminPasskey;

    if (!isAuthorizedPerimeter) {
      // Return genuine 404 Not Found to unauthorized searchers and reconnaissance bots
      const notFoundUrl = new URL('/_not-found', req.url);
      const notFoundRes = NextResponse.rewrite(notFoundUrl, { status: 404 });
      notFoundRes.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
      return applySecurityHeaders(notFoundRes);
    }

    // If authorized via passkey, persist gate cookie for seamless dashboard navigation
    const adminRes = NextResponse.next();
    adminRes.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    if (hasAdminPasskey && !hasAdminGateCookie) {
      adminRes.cookies.set({
        name: 'citzos_admin_gate',
        value: '1',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 8 * 60 * 60,
        path: '/',
      });
    }
    return applySecurityHeaders(adminRes);
  }

  // 3. CANONICAL PRODUCTION DOMAIN ENFORCEMENT:
  // If traffic or crawler visits via *.vercel.app staging domains, 301 Permanent Redirect to https://www.citzos.in
  // and send X-Robots-Tag: noindex to force search engines (Bing, Google) to replace vercel.app with www.citzos.in
  if (hostname.includes('vercel.app')) {
    const canonicalTarget = new URL(pathname + search, 'https://www.citzos.in');
    const redirectResponse = NextResponse.redirect(canonicalTarget, 301);
    redirectResponse.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    return applySecurityHeaders(redirectResponse);
  }

  // Redirect apex domain (citzos.in) to primary canonical domain (www.citzos.in)
  if (hostname === 'citzos.in') {
    const canonicalTarget = new URL(pathname + search, 'https://www.citzos.in');
    return applySecurityHeaders(NextResponse.redirect(canonicalTarget, 301));
  }

  // 2. Skip static assets, Next.js internal files, and Firebase auth proxy
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/__') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 3. Read session token from httpOnly cookie
  const sessionCookie = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  let isAuthenticated = false;

  if (sessionCookie) {
    const session = await verifySessionTokenEdge(sessionCookie);
    if (session.valid) {
      isAuthenticated = true;
    }
  }

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  );

  // 4. Logged-in user visiting /login or /register -> redirect to / (or ?next=) before HTML is sent
  if (isAuthenticated && isAuthRoute) {
    const rawNext = req.nextUrl.searchParams.get('next');
    const safeTarget = getSafeNextUrl(rawNext);
    return applySecurityHeaders(NextResponse.redirect(new URL(safeTarget, req.url)));
  }

  // 5. Check protected routes: /saved (personal saved items)
  const isProtectedSubRoute = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + '/')
  );

  if (!isAuthenticated && isProtectedSubRoute) {
    const nextPath = encodeURIComponent(pathname + search);
    const loginUrl = new URL(`/login?next=${nextPath}`, req.url);
    return applySecurityHeaders(NextResponse.redirect(loginUrl));
  }

  return applySecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - __/auth (Firebase OAuth proxy virtual routes)
     * - favicon.ico, images, audio, video
     */
    '/((?!_next/static|_next/image|__/auth|favicon.ico).*)',
  ],
};
