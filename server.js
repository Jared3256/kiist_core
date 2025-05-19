import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./src/config/database/databaseConnection.js";
import mongoose from "mongoose";

import app from "./src/App.js";
import { logEvents } from "./src/middleware/logger.cjs";

const PORT = process.env.PORT || 3500;

connectDB();

console.log(process.env.NODE_ENV);

// Start the server!

mongoose.connection.once("open", () => {
  console.log("connected to mongo db");
  app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code} \t ${err.syscall} \t ${err.hostname}`,
    "mongoErrLog.log"
  );
});
