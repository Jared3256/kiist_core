import { mongoose } from "mongoose";
import system_data from "../environment/env.constants.js";

export const connectDB = async () => {
 
  try {
    if (system_data.NODE_ENV === "production") {
      await mongoose.connect(system_data.PRODUCTION_DATABASE_URI);
    } else {
      await mongoose.connect(system_data.DEVELOPMENT_DATABASE_URI);
    }
  } catch (err) {
    
  }
};
