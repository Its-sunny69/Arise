import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const URI = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected databse successfully")
  } catch (error) {
    console.error("Databse failed to connect");
    console.error(error)
    process.exit(0);
  }
};

export default connectDb;
