import mongoose, { Connection } from 'mongoose';

// Import models to ensure they are registered before any queries
import '@/models/Category';
import '@/models/Song';
import '@/models/Note';
import '@/models/User';

let cached: { conn: Connection | null; promise: Promise<Connection> | null } = {
  conn: null,
  promise: null,
};

export async function connectDB(): Promise<Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      const errorMsg = 'MONGODB_URI is missing in environment variables';
      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    console.log('Connecting to MongoDB...');

    const opts = {
      maxPoolSize: 10,
      minPoolSize: 5,
      serverSelectionTimeoutMS: 10000, // 10s timeout
      socketTimeoutMS: 45000, // 45s socket timeout
    };

    cached.promise = mongoose
      .connect(mongoUri, opts)
      .then((mongooseInstance) => {
        console.log('MongoDB connected successfully');
        return mongooseInstance.connection;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
        cached.promise = null; // Reset promise so we can try again
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}

export async function disconnectDB(): Promise<void> {
  if (cached.conn) {
    await cached.conn.close();
    cached.conn = null;
    cached.promise = null;
  }
}
