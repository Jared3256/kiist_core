import dotenv from "dotenv";

dotenv.config();

import {connectDB} from "./src/config/database/databaseConnection.js";
import mongoose from "mongoose";

import app from "./src/App.js";
import {logEvents} from "./src/middleware/logger.cjs";

const PORT = process.env.NODE_ENV === "development" ? 3500 : process.env.PORT;
connectDB();

// Start the server!

mongoose.connection.once("open", () => {
    console.log("connected to mongo db");
    app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
    logEvents(
        `${err.no}: ${err.code} \t ${err.syscall} \t ${err.hostname}`,
        "mongoErrLog.log"
    );
});
