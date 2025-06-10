import { MongoClient, MongoClientOptions } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

console.log('MongoDB URI is set:', process.env.MONGODB_URI ? 'Yes' : 'No');

const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {
  maxPoolSize: 1, // Reduce connection pool size for serverless
  minPoolSize: 0, // Don't maintain minimum connections
  maxIdleTimeMS: 30000, // Increased idle timeout to 30 seconds
  serverSelectionTimeoutMS: 15000, // Increased selection timeout
  socketTimeoutMS: 45000, // Increased socket timeout for larger payloads
  connectTimeoutMS: 15000, // Increased connection timeout
  retryWrites: true,
  retryReads: true,
  w: 'majority',
  // Add compression for better performance with large payloads
  compressors: ['zlib'],
  zlibCompressionLevel: 6,
};

console.log('MongoDB connection options:', JSON.stringify(options, null, 2));

let client: MongoClient | null = null;

export async function connectToDatabase() {
  try {
    console.log('Attempting to connect to MongoDB...');
    
    // Create a new client if we don't have one
    if (!client) {
      console.log('Creating new MongoDB client');
      client = new MongoClient(uri, options);
    }

    // Try to connect or reuse existing connection
    await client.connect();
    console.log('MongoDB client connected successfully');

    const db = client.db('health-sync');
    console.log('Selected database: health-sync');

    // Test the connection
    console.log('Testing connection with ping command...');
    await db.command({ ping: 1 });
    console.log('Successfully pinged the database');

    return { client, db };
  } catch (error) {
    console.error('MongoDB connection error in connectToDatabase():', error);
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    // Clean up failed client
    if (client) {
      await client.close();
      client = null;
    }
    
    throw error;
  }
}

// Handle cleanup
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing MongoDB connection');
  if (client) {
    await client.close();
    client = null;
  }
}); 