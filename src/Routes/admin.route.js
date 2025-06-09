import express from "express";
import departmentRouter from "./department/department.route.js";
import { hasPermission } from "../middleware/hasPermission.js";
import createDepartmentController from "../controller/department/createDepartmentController.js";

const adminRouter = express.Router();

/**
 * Department Routes
 */
adminRouter.post("/department/create", createDepartmentController.create);
adminRouter.put("/department/update", createDepartmentController.update);
adminRouter.delete("/department/remove", createDepartmentController.delete);
adminRouter.get("/department/list", createDepartmentController.list);

export default adminRouter;
