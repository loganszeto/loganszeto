import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for the API
  if (request.nextUrl.pathname.startsWith('/api/health/sync')) {
    const cloudRunUrl = 'https://loganszeto-660180661332.us-west2.run.app/api/health/sync';

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // Redirect all other requests to Cloud Run
    return NextResponse.redirect(cloudRunUrl, 307);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/health/sync',
}; 