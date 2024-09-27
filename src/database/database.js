import mongoose from "mongoose";

const URI = "mongodb+srv://ranjeetyadav31638:i88rHyT8v9468T7X@arise0.l4sif.mongodb.net/arise?retryWrites=true&w=majority&appName=arise0";

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
