import express from "express";
import createUserController from "../../controller/user/index.js";

const userRouter = express.Router();

/**
 * @description API user route
 * @description /api/v1/user/listall
 * @method GET
 */
userRouter.get("/listall", createUserController.listall);

export default userRouter;
