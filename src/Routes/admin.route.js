import express from "express";
import departmentRouter from "./department/department.route.js";
import {hasPermission} from "../middleware/hasPermission.js";
import createDepartmentController from "../controller/department/createDepartmentController.js";
import createCourseController from "../controller/course/createCourseController.js";
import createTutorController from "../controller/tutor/createTutorController.js";
import {multerUpload} from "../config/firebase/firebase.config.js";
import createAdminMiddleware from "../controller/admin/createAdminMiddleware.js";
import createSessionMiddlewareController from "../controller/session/createSessionMiddlewareController.js";
import createAdminGradeMiddlewareController from "../controller/grade/createAdminGradeMiddlewareController.js";

const adminRouter = express.Router();


/**
 * Admin Upload Links
 */
adminRouter.post("/:id/upload", multerUpload.single("file"), createAdminMiddleware.files)

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
adminRouter.put("/tutor/:id/assign-class", createTutorController.assignClasses)
adminRouter.delete("/tutor/:id/remove", createTutorController.remove);
adminRouter.get("/tutor/list", createTutorController.listTutors);
adminRouter.post("/tutor/create", createTutorController.create)

/**
 * Student management Link for the Admin
 */
adminRouter.get("/student/list", createAdminMiddleware.student_list)
adminRouter.delete("/student/:id/remove", createAdminMiddleware.student_remove)


/**
 * Session management Routes for the admin Only
 */
adminRouter.get("/session/get", createSessionMiddlewareController.get_semester)
adminRouter.post("/session/create", createSessionMiddlewareController.create_session)
adminRouter.put("/session/:id/toggle", createSessionMiddlewareController.toggle_session)
adminRouter.put("/session/:id/update-deadline", createSessionMiddlewareController.deadline_update)
adminRouter.get("/:id/session/reporting-history", createAdminMiddleware.session_student_list)
adminRouter.get("/session/override/list", createSessionMiddlewareController.session_admin_overrid_list)
adminRouter.post("/:id/session/student/override", createSessionMiddlewareController.session_admin_override)

/**
 * Grade Management Router for the admin only
 */
adminRouter.get("/grade/list", createAdminGradeMiddlewareController.list)
adminRouter.post("/grade/create", createAdminGradeMiddlewareController.create)
adminRouter.post("/grade/edit", createAdminGradeMiddlewareController.edit)


/**
 * Student Related Finance
 */
adminRouter.get("/student/finance/info/list", createAdminMiddleware.student_finance_info)
adminRouter.get("/student/finance/history/list", createAdminMiddleware.student_finance_history)
adminRouter.post("/student/finance/payment/create", createAdminMiddleware.student_finance_create)
adminRouter.post("/student/finance/reminder/create", createAdminMiddleware.student_finance_email_reminder)
export default adminRouter;
