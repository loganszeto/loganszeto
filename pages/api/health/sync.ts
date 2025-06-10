import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';
import Cors from 'cors';

// Initialize the cors middleware
const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'],
  origin: '*',
  optionsSuccessStatus: 200,
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Run the CORS middleware
    await runMiddleware(req, res, cors);

    // Only allow POST and OPTIONS methods
    if (req.method !== 'POST' && req.method !== 'OPTIONS') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // Connect to MongoDB
    const { db } = await connectToDatabase();

    // Get the data from the request body
    const healthData = req.body;

    // Validate the data
    if (!Array.isArray(healthData)) {
      return res.status(400).json({ error: 'Invalid data format. Expected an array.' });
    }

    // If the array is empty, return success without doing anything
    if (healthData.length === 0) {
      return res.status(200).json({ message: 'No data to process' });
    }

    // Insert the data into MongoDB
    const result = await db.collection('health').insertMany(healthData);

    // Return success response
    return res.status(200).json({
      message: 'Data synced successfully',
      insertedCount: result.insertedCount,
    });
  } catch (error) {
    console.error('Error in /api/health/sync:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
} 