import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Allow all requests to the health sync endpoint
  if (request.nextUrl.pathname.startsWith('/api/health/sync')) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: '/api/:path*',
}; 