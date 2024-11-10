import * as mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config();

export const connectionDB = async() => {
    const DB_URL: string = process.env.DB_URL || "mongodb://localhost:27017";

    try {
      await mongoose.connect(DB_URL, {
        dbName: "cosmiccode",
        bufferCommands: true
      })
      console.log('Mongo Connection successfull')
    } catch (err) {
     console.log('Mongo Connection Error', err)
    }

}