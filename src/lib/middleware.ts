import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from './auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the request is for admin routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const payload = AuthService.verifyToken(token);
    if (!payload) {
      // Redirect to login if invalid token
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Token is valid, allow access
    return NextResponse.next();
  }

  // Allow all other requests
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};