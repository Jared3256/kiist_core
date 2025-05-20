import express from "express";

import createAuthController from "../../controller/auth/index.js";
const authRouter = express.Router();

authRouter.post("/login", createAuthController.login);

authRouter.get("/refresh", createAuthController.refresh);
export default authRouter;
