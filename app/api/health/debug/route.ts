import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import HealthData from '@/lib/models/HealthData';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Get the most recent health data entry
    const latestData = await HealthData.findOne().sort({ timestamp: -1 });
    
    if (!latestData) {
      return NextResponse.json({ 
        message: 'No health data found',
        data: null 
      });
    }

    return NextResponse.json({
      message: 'Latest health data retrieved',
      timestamp: latestData.timestamp,
      rawData: latestData.rawData,
      parsedData: {
        activeEnergy: latestData.activeEnergy,
        sleepAnalysis: latestData.sleepAnalysis
      }
    });
  } catch (error) {
    console.error('Error fetching debug data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch debug data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 