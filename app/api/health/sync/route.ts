import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';

// Handle OPTIONS request for CORS
export async function OPTIONS() {
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

// Handle GET request
export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const documents = await db.collection('health').find().sort({ timestamp: -1 }).toArray();
    return NextResponse.json({ data: documents });
  } catch (error) {
    console.error('Error in GET /api/health/sync:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}

// Handle POST request
export async function POST(request: Request) {
  try {
    // Get the data from the request body
    const healthData = await request.json();
    console.log('Received data:', JSON.stringify(healthData));

    // Validate the data
    if (!Array.isArray(healthData)) {
      console.log('Invalid data format:', typeof healthData);
      return NextResponse.json(
        { error: 'Invalid data format. Expected an array.' },
        { status: 400 }
      );
    }

    // If the array is empty, return success without doing anything
    if (healthData.length === 0) {
      console.log('Empty array received, returning early');
      return NextResponse.json({ message: 'No data to process' });
    }

    // Add timestamp to each document
    const documentsWithTimestamp = healthData.map(data => ({
      ...data,
      timestamp: new Date().toISOString()
    }));

    // Insert the data
    console.log('Attempting to insert data...');
    const { db } = await connectToDatabase();
    const result = await db.collection('health').insertMany(documentsWithTimestamp);
    console.log('Successfully inserted data');

    // Return success response
    return NextResponse.json({
      message: 'Data synced successfully',
      insertedCount: Object.keys(result.insertedIds).length,
    });
  } catch (error) {
    console.error('Error in POST /api/health/sync:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
} 