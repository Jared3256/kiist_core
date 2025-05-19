import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { notFound } from "./Handlers/ErrorManager.js";
import { logger } from "./middleware/logger.cjs";
import { corsOptions } from "./config/cors/corsOptions.js";
import errorHandler from "./middleware/errorHandler.js";
import ServerlessHttp from "serverless-http";
import { rootRouter } from "./Routes/root.cjs";
import systemRouter from "./Routes/system.route.js";
// create our Express app
const app = express();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use(express.static("./public/css"));

app.use("/", rootRouter);
app.use("/api/v1", systemRouter);

app.use(errorHandler);
app.use(notFound);

const handlerApp = ServerlessHttp(app);
export default app;
