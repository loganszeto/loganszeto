import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { MongoClient } from 'mongodb';
import HealthData from '@/lib/models/HealthData';

// Configure route to handle large payloads
export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutes
export const fetchCache = 'force-no-store';

let mongoClient: MongoClient | null = null;

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    // Skip DB operations during build time
    if (!process.env.MONGODB_URI) {
      console.warn("MONGODB_URI not defined — skipping DB work");
      return NextResponse.json({ 
        error: 'Database configuration not available',
        details: 'MongoDB connection string is not configured'
      }, { status: 503 });
    }

    // Connect to MongoDB
    await connectToDatabase();
    
    // Parse the request body with streaming
    const text = await req.text();
    const contentLength = req.headers.get('content-length');
    console.log(`[Health Sync] Received request with size: ${contentLength} bytes`);

    // Check payload size (10MB limit)
    if (text.length > 10 * 1024 * 1024) {
      throw new Error('PayloadTooLargeError');
    }

    // Parse JSON
    const body = JSON.parse(text);

    // Store in MongoDB using mongoose
    const healthData = new HealthData({
      data: body,
      timestamp: new Date(),
      userId: body.userId || 'anonymous',
      size: text.length
    });
    
    await healthData.save();
    console.log(`[Health Sync] Successfully stored data`);
    
    return NextResponse.json({ 
      success: true,
      message: 'Health data synced successfully',
      id: healthData._id 
    }, { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error: any) {
    console.error('[Health Sync] Error:', error);
    
    // Handle specific error types
    if (error.message === 'PayloadTooLargeError') {
      return NextResponse.json({
        error: 'Payload too large',
        details: 'The health data payload exceeds the 10MB limit'
      }, { 
        status: 413,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      });
    }
    
    if (error.name === 'TimeoutError' || error.message?.includes('timeout')) {
      return NextResponse.json({
        error: 'Request timeout',
        details: 'The request took too long to process'
      }, { 
        status: 408,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      });
    }

    // Handle MongoDB connection errors
    if (error.name === 'MongoNetworkError' || error.message?.includes('connect ECONNREFUSED')) {
      return NextResponse.json({
        error: 'Database connection error',
        details: 'Failed to connect to the database'
      }, { 
        status: 503,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      });
    }
    
    return NextResponse.json({
      error: 'Internal server error',
      details: error.message || 'An unexpected error occurred'
    }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  }
} 