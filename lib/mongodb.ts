import { MongoClient, MongoClientOptions } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {
  connectTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  serverSelectionTimeoutMS: 60000,
  maxPoolSize: 50,
  minPoolSize: 5,
  maxIdleTimeMS: 120000,
  waitQueueTimeoutMS: 30000,
  retryWrites: true,
  w: 'majority' as const,
  retryReads: true,
  ssl: true,
  tls: true,
  tlsAllowInvalidCertificates: false,
  directConnection: true,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect().catch(error => {
      console.error('Failed to connect to MongoDB:', error);
      throw error;
    });
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect().catch(error => {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  });
}

export async function connectToDatabase() {
  try {
    const client = await clientPromise;
    const db = client.db('health-sync');

    // Test the connection
    await db.command({ ping: 1 });
    console.log('Successfully connected to MongoDB');

    return { client, db };
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Export a promise that resolves to the MongoDB client
export default clientPromise; 