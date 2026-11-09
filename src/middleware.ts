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

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // 1. Skip static assets, Next.js internal files, Firebase auth proxy, admin portal, and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/__') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 2. Read session token from httpOnly cookie
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

  // 3. Logged-in user visiting /login or /register -> redirect to / (or ?next=) before HTML is sent
  if (isAuthenticated && isAuthRoute) {
    const rawNext = req.nextUrl.searchParams.get('next');
    const safeTarget = getSafeNextUrl(rawNext);
    return NextResponse.redirect(new URL(safeTarget, req.url));
  }

  // 4. Check protected routes: /saved (personal saved items)
  const isProtectedSubRoute = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + '/')
  );

  if (!isAuthenticated && isProtectedSubRoute) {
    const nextPath = encodeURIComponent(pathname + search);
    const loginUrl = new URL(`/login?next=${nextPath}`, req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
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
