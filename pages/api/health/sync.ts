import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';
import { MongoServerSelectionError, MongoNetworkError } from 'mongodb';

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
    console.log('Attempting to connect to MongoDB...');
    console.log('MongoDB URI:', process.env.MONGODB_URI ? 'URI is set' : 'URI is not set');

    // Connect to MongoDB
    const { db } = await connectToDatabase();
    console.log('Successfully connected to MongoDB');

    // Get the data from the request body
    const healthData = req.body;
    console.log('Received data:', JSON.stringify(healthData));

    // Validate the data
    if (!Array.isArray(healthData)) {
      console.log('Invalid data format:', typeof healthData);
      res.status(400).json({ error: 'Invalid data format. Expected an array.' });
      return;
    }

    // If the array is empty, return success without doing anything
    if (healthData.length === 0) {
      console.log('Empty array received, returning early');
      res.status(200).json({ message: 'No data to process' });
      return;
    }

    // Insert the data into MongoDB
    console.log('Attempting to insert data into MongoDB...');
    const result = await db.collection('health').insertMany(healthData);
    console.log('Successfully inserted data:', result.insertedCount, 'documents');

    // Return success response
    res.status(200).json({
      message: 'Data synced successfully',
      insertedCount: result.insertedCount,
    });
  } catch (error) {
    console.error('Error in /api/health/sync:', error);

    // Handle MongoDB connection errors specifically
    if (error instanceof MongoServerSelectionError) {
      console.error('MongoDB Server Selection Error:', error.message);
      console.error('Topology Description:', error.reason);
      res.status(503).json({
        error: 'Database connection error',
        message: 'Unable to connect to the database. Please try again later.',
        details: error.message,
      });
      return;
    }

    // Handle network errors
    if (error instanceof MongoNetworkError) {
      console.error('MongoDB Network Error:', error.message);
      res.status(503).json({
        error: 'Network error',
        message: 'Unable to reach the database. Please check network connectivity.',
        details: error.message,
      });
      return;
    }

    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
} 