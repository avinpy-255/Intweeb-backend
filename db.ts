import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DB_URL: string = process.env.DB_URL || "mongodb://localhost:27017/cosmiccode";

export const connectionDB = async (): Promise<void> => {
  try {
    await mongoose.connect(DB_URL, {
      dbName: "cosmiccode",
      bufferCommands: true,
    });
    console.log('MongoDB connection successful');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};
