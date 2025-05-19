import express from "express";
import userRouter from "./users/users.route.js";
import authRouter from "./auth/auth.route.js";

const systemRouter = express.Router();

/**
 * @description API master route
 * * @swagger
 * * /api
 */

// Configure user
systemRouter.use("/user", userRouter);

//configure auth
systemRouter.use("/auth", authRouter);
export default systemRouter;
