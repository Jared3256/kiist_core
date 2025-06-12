import express from "express";
import departmentRouter from "./department/department.route.js";
import { hasPermission } from "../middleware/hasPermission.js";
import createDepartmentController from "../controller/department/createDepartmentController.js";
import createCourseController from "../controller/course/createCourseController.js";
import createTutorController from "../controller/tutor/createTutorController.js";
import {multerUpload} from "../config/firebase/firebase.config.js";
import createAdminMiddleware from "../controller/admin/createAdminMiddleware.js";

const adminRouter = express.Router();


/**
 * Admin Upload Links
 */
adminRouter.post("/:id/upload" , multerUpload.single("file"),createAdminMiddleware.files)

/**
 * Department Routes
 */
adminRouter.get("/:adminId/department/:departmentId/get", createDepartmentController.get)
adminRouter.post("/department/create", createDepartmentController.create);
adminRouter.put("/department/update", createDepartmentController.update);
adminRouter.delete("/department/remove", createDepartmentController.delete);
adminRouter.get("/department/list", createDepartmentController.list);

/**
 * Course Routes
 */
adminRouter.get("/course/list", createCourseController.list);
adminRouter.get(
  "/course/department/list",
  createCourseController.list_by_department
);
adminRouter.delete("/course/remove", createCourseController.remove);
adminRouter.post("/course/create", createCourseController.create);

/**
 * Lecturer | Tutor routes
 */
adminRouter.get("/tutor/list", createTutorController.listTutors);
adminRouter.post("/tutor/create", createTutorController.create)
export default adminRouter;
