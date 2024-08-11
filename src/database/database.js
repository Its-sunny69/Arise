// backend/database.js

import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config({path: "../../.env"});

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB!");
    return client;
  } catch (error) {
    console.error("An error occurred while connecting to MongoDB:", error);
    throw error;
  }
}
