import express from "express";

import createAuthController from "../../controller/auth/index.js";

const authRouter = express.Router();

authRouter.post("/login", createAuthController.login);

authRouter.get("/refresh", createAuthController.refresh);

authRouter.post("/logout", createAuthController.logout);

authRouter.post("/reset-password", createAuthController.reset_password)

authRouter.post("/change-password", createAuthController.change_password)

authRouter.post("/verify-email", createAuthController.verify_email)
export default authRouter;
