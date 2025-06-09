import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import HealthData from '@/lib/models/HealthData';

// Increase body size limit to 10mb
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

interface HealthDataEntry {
  activeEnergy: Array<{
    date: string;
    value: number;
  }>;
  sleepAnalysis: Array<{
    startDate: string;
    endDate: string;
    value: 'INBED' | 'ASLEEP' | 'AWAKE';
  }>;
}

// Declare global type
declare global {
  let healthData: StoredHealthData[];
}

interface StoredHealthData {
  timestamp: string;
  data: HealthDataEntry;
}

export async function POST(request: Request) {
  try {
    // Log the request headers
    const headers = Object.fromEntries(request.headers.entries());
    console.log('Request headers:', headers);

    // Get and log the raw body
    const rawBody = await request.text();
    console.log('Raw request body:', rawBody);

    // Parse the JSON data
    let data;
    try {
      data = JSON.parse(rawBody);
      console.log('Parsed data:', JSON.stringify(data, null, 2));
    } catch (e) {
      console.error('Failed to parse JSON:', e);
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    // Connect to database
    await connectToDatabase();

    // Store both raw and parsed data
    const healthData = new HealthData({
      rawData: data,
      activeEnergy: data.activeEnergy || [],
      sleepAnalysis: data.sleepAnalysis || [],
      timestamp: new Date()
    });

    await healthData.save();

    // Return success with the parsed data
    return NextResponse.json({ 
      success: true,
      data: {
        activeEnergy: data.activeEnergy || [],
        sleepAnalysis: data.sleepAnalysis || []
      },
      message: 'Data received and stored successfully'
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const data = await HealthData.find().sort({ timestamp: -1 }).limit(7);
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching health data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch health data' },
      { status: 500 }
    );
  }
} 