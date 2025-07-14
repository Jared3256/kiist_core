import express from "express";
import createUserController from "../../controller/user/index.js";
import createAdminMiddleware from "../../controller/admin/createAdminMiddleware.js";

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
userRouter.post("/create", createAdminMiddleware.admin_register);

export default userRouter;
