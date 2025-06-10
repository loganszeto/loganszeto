import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import HealthData from '@/lib/models/HealthData';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '86400');
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectToDatabase();
    const healthData = req.body;

    if (!Array.isArray(healthData)) {
      return res.status(400).json({ error: 'Invalid data format' });
    }

    const result = await HealthData.insertMany(healthData);
    res.status(200).json({ success: true, count: result.length });
  } catch (error) {
    console.error('Error syncing health data:', error);
    res.status(500).json({ error: 'Error syncing health data' });
  }
} 