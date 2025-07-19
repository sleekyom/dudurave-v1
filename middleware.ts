import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Site is now live - no more coming-soon redirects
  // All routes are accessible
  return NextResponse.next();

  /* DISABLED - Coming Soon Mode
  // Get the pathname from the URL
  const path = request.nextUrl.pathname;

  // Skip middleware during build/export
  if (process.env.NODE_ENV === 'development' || process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.next();
  }

  // Allow public assets, API routes, and the coming soon page
  if (
    path === '/coming-soon' ||
    path.startsWith('/api/') ||
    path.startsWith('/_next/') ||
    path === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // Redirect everything else to coming soon page
  return NextResponse.redirect(new URL('/coming-soon', request.url));
  */
}

// Configure the middleware to run on specific paths, excluding build-critical paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - API routes (/api/*)
     * - Static files (_next/static/*, _next/image/*, favicon.ico, etc.)
     * - The coming-soon path itself
     */
    '/((?!api|_next/static|_next/image|_next/data|favicon.ico|coming-soon).*)',
  ],
};
