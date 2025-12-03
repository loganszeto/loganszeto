import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { HealthDataPayload } from '@/lib/models/HealthData';

// This endpoint receives data from Health Auto Export app
// Endpoint: https://loganszeto.com/api/health/sync
export async function POST(request: NextRequest) {
  try {
    const payload: HealthDataPayload = await request.json();
    
    if (!payload.data || !payload.data.metrics) {
      return NextResponse.json(
        { success: false, error: 'Invalid data format' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const collection = db.collection('health-data');

    // Store the health data
    const document = {
      timestamp: new Date(),
      metrics: payload.data.metrics,
      createdAt: new Date(),
    };

    await collection.insertOne(document);
    
    console.log(`Stored health data with ${payload.data.metrics.length} metrics`);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Health data received and stored',
      timestamp: new Date().toISOString(),
      metricsCount: payload.data.metrics.length
    });
  } catch (error) {
    console.error('Error processing health data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process health data' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    message: 'Health Auto Export API is running',
    endpoint: '/api/health/sync',
    url: 'https://loganszeto.com/api/health/sync'
  });
}

