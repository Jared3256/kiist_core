import express from "express";
import createUserController from "../../controller/user/index.js";

const userRouter = express.Router();

/**
 * @description API user route
 * @description /api/v1/user/listall
 * @method GET
 */
userRouter.get("/listall", createUserController.listall);

/**
 * @description API get user route
 * @description /api/v1/user/create
 * @method POST
 */
userRouter.post("/create", createUserController.create);

export default userRouter;
