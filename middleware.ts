import { NextResponse, NextRequest } from 'next/server';
import { getSessionCookie} from 'better-auth/cookies'
// import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const sessionCookie = getSessionCookie(req);
  const { pathname } = req.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/blogs/admin')) {
    if (!sessionCookie) {
      // Redirect to login if no session
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/blogs/admin/:path*',
    // Add other protected routes here
  ],
};