import mongoose, { Connection } from 'mongoose';

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
      console.error('MONGODB_URI is missing');
      throw new Error(
        'MONGODB_URI is not defined. Please set it in your environment variables.'
      );
    }

    cached.promise = mongoose
      .connect(mongoUri, {
        maxPoolSize: 10,
        minPoolSize: 5,
      })
      .then((mongoose) => mongoose.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export async function disconnectDB(): Promise<void> {
  if (cached.conn) {
    await cached.conn.close();
    cached.conn = null;
    cached.promise = null;
  }
}
