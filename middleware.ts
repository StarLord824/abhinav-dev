import { NextResponse, NextRequest } from 'next/server';
// import { getToken } from 'next-auth/jwt';

export async function middleware(req : NextRequest) {
//   const token = await getToken({ req });
//   if (req.nextUrl.pathname.startsWith('/blog/admin')) {
//     if (!token || token.role !== 'ADMIN') {
//       return NextResponse.redirect(new URL('/login', req.url));
//     }
//   }
//   return NextResponse.next();
}

export const config = {
  matcher: '/blog/:path*',
};