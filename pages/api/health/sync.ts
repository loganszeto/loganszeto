import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST method
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Connect to MongoDB
    const { db } = await connectToDatabase();

    // Get the data from the request body
    const healthData = req.body;

    // Validate the data
    if (!Array.isArray(healthData)) {
      res.status(400).json({ error: 'Invalid data format. Expected an array.' });
      return;
    }

    // If the array is empty, return success without doing anything
    if (healthData.length === 0) {
      res.status(200).json({ message: 'No data to process' });
      return;
    }

    // Insert the data into MongoDB
    const result = await db.collection('health').insertMany(healthData);

    // Return success response
    res.status(200).json({
      message: 'Data synced successfully',
      insertedCount: result.insertedCount,
    });
  } catch (error) {
    console.error('Error in /api/health/sync:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
} 