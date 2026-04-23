import mongoose from "mongoose";
import system_data from "../environment/env.constants.js";

const DB_OPTIONS = {
  serverSelectionTimeoutMS: 5000,
};

export const connectDB = async () => {
  try {
    const uri =
      system_data.NODE_ENV === "production"
        ? system_data.PRODUCTION_DATABASE_URI
        : system_data.DEVELOPMENT_DATABASE_URI;

    await mongoose.connect(uri, DB_OPTIONS);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};
