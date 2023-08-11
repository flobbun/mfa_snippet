/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose, { type Connection } from 'mongoose';
import ENV_VARS from "../environment";

interface MongooseCache {
  conn: Connection | null;
  promise: Promise<typeof mongoose> | null;
}

// @ts-ignore
const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };

async function connect(): Promise<Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(ENV_VARS.MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }

  // @ts-ignore
  cached.conn = await cached.promise;
  // @ts-ignore
  return cached.conn;
}

export default connect;

