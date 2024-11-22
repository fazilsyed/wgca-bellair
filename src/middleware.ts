import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define public paths that don't require authentication
const publicPaths = ['/', '/signin', '/signup', '/reset-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthPath = pathname.startsWith('/(authenticated)') || 
                    pathname.includes('/home') ||
                    pathname.includes('/menu') ||
                    pathname.includes('/pro-shop') ||
                    pathname.includes('/tee-times') ||
                    pathname.includes('/range') ||
                    pathname.includes('/course-map') ||
                    pathname.includes('/lessons') ||
                    pathname.includes('/events') ||
                    pathname.includes('/help') ||
                    pathname.includes('/profile') ||
                    pathname.includes('/feedback');

  // Get the token from cookies
  const token = request.cookies.get('auth-token')?.value;

  // Redirect authenticated users away from auth pages
  if (publicPaths.includes(pathname)) {
    if (token) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
    return NextResponse.next();
  }

  // Protect authenticated routes
  if (isAuthPath && !token) {
    const redirectUrl = new URL('/signin', request.url);
    redirectUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

// Update config to match all routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
}; 