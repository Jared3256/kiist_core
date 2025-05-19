import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { notFound } from "./Handlers/ErrorManager.js";
import { logger } from "./middleware/logger.cjs";
import { corsOptions } from "./config/cors/corsOptions.js";
import errorHandler from "./middleware/errorHandler.js";

// create our Express app
const app = express();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use(express.static("./public/css"));

import { rootRouter } from "./Routes/root.cjs";
app.use("/", rootRouter);

// ------------------------------   INTERNET FUNCTIONS  ----------------------------------- //
import userRouter from "./Routes/net/net.user.routes.js";
app.use("/net", userRouter);

import vendorRouter from "./Routes/net/net.vendor.routes.js";
app.use("/net", vendorRouter);

import routerRouter from "./Routes/net/net.router.routes.js";
app.use("/net/api/router", routerRouter);

import sessionsRouter from "./Routes/net/net.sessions.routes.js";
app.use("/net/api/sessions", sessionsRouter);

import paymentRouter from "./Routes/net/net.payment.routes.js";
app.use("/net/api/payment", paymentRouter);

import vendorSubscriptionRouter from "./Routes/net/net.vendor.subscription.routes.js";

app.use("/net/api/vendor/subscription", vendorSubscriptionRouter);

import subscriptionRouter from "./Routes/net/net.subscription.routes.js";
app.use("/net/api/user/subscription", subscriptionRouter);

app.use(errorHandler);
app.use(notFound);

export default app;
