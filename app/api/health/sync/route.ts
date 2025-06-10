import { NextResponse } from 'next/server';

// Mark this route as static
export const dynamic = 'force-static';
export const runtime = 'edge';

// Handle OPTIONS request for CORS
export function OPTIONS() {
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

// Handle GET request - redirect to Cloud Run
export function GET() {
  return NextResponse.redirect('https://loganszeto-660180661332.us-west2.run.app/api/health/sync', 307);
}

// Handle POST request - redirect to Cloud Run
export function POST() {
  return NextResponse.redirect('https://loganszeto-660180661332.us-west2.run.app/api/health/sync', 307);
} 