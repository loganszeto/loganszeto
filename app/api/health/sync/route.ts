import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    console.log('Received health data sync request');
    
    // Parse the request body
    const healthData = await req.json();
    console.log('Parsed health data:', JSON.stringify(healthData).slice(0, 100) + '...');

    // Connect to MongoDB
    const { db } = await connectToDatabase();
    console.log('Connected to MongoDB');

    // Store the data
    const collection = db.collection('health-data');
    const result = await collection.insertOne({
      timestamp: new Date(),
      data: healthData
    });
    console.log('Stored health data with ID:', result.insertedId);

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('Error in health sync API:', error);
    return NextResponse.json(
      { error: 'Failed to process health data' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log('Received health data fetch request');
    
    // Connect to MongoDB
    const { db } = await connectToDatabase();
    console.log('Connected to MongoDB');

    // Fetch the latest data
    const collection = db.collection('health-data');
    const data = await collection
      .find()
      .sort({ timestamp: -1 })
      .limit(10)
      .toArray();
    
    console.log('Retrieved', data.length, 'health data records');

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in health fetch API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch health data' },
      { status: 500 }
    );
  }
} 