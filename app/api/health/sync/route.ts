import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import HealthData from '@/lib/models/HealthData';

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
    await connectToDatabase();
    const data = await request.json();
    
    const healthData = new HealthData({
      activeEnergy: data.activeEnergy,
      sleepAnalysis: data.sleepAnalysis,
    });

    await healthData.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing health data:', error);
    return NextResponse.json(
      { error: 'Failed to process health data' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const data = await HealthData.find().sort({ timestamp: -1 }).limit(7); // Last 7 days
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching health data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch health data' },
      { status: 500 }
    );
  }
} 