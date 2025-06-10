// Force Vercel redeploy - 2024-03-20
import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/mongodb';
import HealthData from '@/lib/models/HealthData';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Allow large payloads
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle GET request for fetching data
  if (req.method === 'GET') {
    try {
      await connectToDatabase();
      const data = await HealthData.find().sort({ timestamp: -1 }).limit(7);
      return res.status(200).json({ data });
    } catch (error) {
      console.error('Error fetching health data:', error);
      return res.status(500).json({ error: 'Failed to fetch health data' });
    }
  }

  // Handle POST request for storing data
  if (req.method === 'POST') {
    try {
      // Log the request headers
      console.log('Request headers:', req.headers);

      const rawBody = req.body;
      console.log('Raw request body:', JSON.stringify(rawBody, null, 2));

      if (!rawBody) {
        return res.status(400).json({ error: 'Empty body' });
      }

      await connectToDatabase();

      // Store both raw and parsed data
      const healthData = new HealthData({
        rawData: rawBody,
        activeEnergy: rawBody.activeEnergy || [],
        sleepAnalysis: rawBody.sleepAnalysis || [],
        timestamp: new Date()
      });

      await healthData.save();
      console.log('Data saved successfully');

      return res.status(200).json({
        success: true,
        data: {
          activeEnergy: rawBody.activeEnergy || [],
          sleepAnalysis: rawBody.sleepAnalysis || []
        },
        message: 'Data received and stored successfully'
      });
    } catch (err) {
      console.error('API error:', err);
      return res.status(500).json({ 
        error: 'Internal server error',
        details: err instanceof Error ? err.message : 'Unknown error'
      });
    }
  }

  // Handle unsupported methods
  return res.status(405).json({ error: 'Method not allowed' });
} 