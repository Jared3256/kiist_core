import express from "express";
import userRouter from "./users/users.route.js";
import authRouter from "./auth/auth.route.js";
import paymentRouter from "./payment/payment.route.js";
import studentRouter from "./students/student.route.js";

const systemRouter = express.Router();

/**
 * @description API master route
 * * @swagger
 * * /api
 */

// Configure user
systemRouter.use("/user", userRouter);

//configure student routes
systemRouter.use("/student", studentRouter)

//configure auth
systemRouter.use("/auth", authRouter);

// configure payment
systemRouter.use("/payment", paymentRouter);


export default systemRouter;
