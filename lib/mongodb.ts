import mongoose from 'mongoose';

let isConnected = false;

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('MONGODB_URI environment variable is not set');
    } else {
      console.warn('MONGODB_URI is not defined — skipping DB connection (dev build)');
      return;
    }
  }

  if (isConnected) return;

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
} 