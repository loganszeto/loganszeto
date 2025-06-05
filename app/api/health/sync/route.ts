import { NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';
import { HealthData, HealthDataParser } from '@/app/components/health/HealthDataParser';

// Store data in a JSON file (we can switch to a proper database later)
const DATA_FILE = path.join(process.cwd(), 'data', 'health_data.json');

export async function POST(request: Request) {
  try {
    const xmlData = await request.text();
    const healthData = await HealthDataParser.parseXMLData(xmlData);
    
    // Save the processed data
    await writeFile(DATA_FILE, JSON.stringify(healthData, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing health data:', error);
    return NextResponse.json({ error: 'Failed to process health data' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const data = await readFile(DATA_FILE, 'utf-8');
    const healthData: HealthData = JSON.parse(data);
    
    // Convert string dates back to Date objects
    healthData.sleepAnalysis = healthData.sleepAnalysis.map(entry => ({
      ...entry,
      startDate: new Date(entry.startDate),
      endDate: new Date(entry.endDate)
    }));
    
    healthData.vo2Max = healthData.vo2Max.map(entry => ({
      ...entry,
      date: new Date(entry.date)
    }));
    
    healthData.activeEnergy = healthData.activeEnergy.map(entry => ({
      ...entry,
      date: new Date(entry.date)
    }));
    
    return NextResponse.json(healthData);
  } catch (error) {
    console.error('Error reading health data:', error);
    return NextResponse.json({ error: 'Failed to read health data' }, { status: 500 });
  }
} 