import express from "express";
import createStudentmiddleware from "../../controller/student/createStudentmiddleware.js";
import {multerUpload} from "../../config/firebase/firebase.config.js";
import createCourseController from "../../controller/course/createCourseController.js";
import createDepartmentController from "../../controller/department/createDepartmentController.js";
import createReportingSessionController from "../../controller/student/session/createReportingSessionController.js";
import createAdminGradeMiddlewareController from "../../controller/grade/createAdminGradeMiddlewareController.js";

const studentRouter = express.Router();

/**
 * Student admission
 */
studentRouter.post("/register", createStudentmiddleware.register_new);
studentRouter.put("/:id/contact", createStudentmiddleware.contact);
studentRouter.put("/:id/academic", createStudentmiddleware.academic);
studentRouter.put("/:id/payment", createStudentmiddleware.payment);
studentRouter.post("/:id/submit", createStudentmiddleware.submit);
studentRouter.put("/:id/program", createStudentmiddleware.program);
studentRouter.put("/:id/statement", createStudentmiddleware.statement);
studentRouter.put("/:id/document", createStudentmiddleware.documents);
studentRouter.post(
    "/:id/upload",
    multerUpload.single("file"),
    createStudentmiddleware.files
);

// Reading student files
studentRouter.get(
    "/:id/high-school-transcript",
    createStudentmiddleware.read_high_school_transcript
);

/**
 * Read the Course and department that is available to the student
 */
studentRouter.get("/course/list", createCourseController.list)
studentRouter.get("/department/list", createDepartmentController.list)


/**
 * Student Finance Related Routes only
 */
studentRouter.get("/:id/finance/get-info", createStudentmiddleware.finance_get_information)
studentRouter.get("/:id/finance/payment/list", createStudentmiddleware.finance_get_payment_history)

/**
 * Session Reporting
 */
studentRouter.post("/:id/session/reporting", createReportingSessionController.report_session)
studentRouter.get("/:id/session/get", createReportingSessionController.session_get)


/**
 * Grades and Transcript
 */
studentRouter.get("/:id/transcript/get", createAdminGradeMiddlewareController.student_get)

/**
 * Update student avatar
 */
studentRouter.put("/:id/avatar/upload", createStudentmiddleware.avatar)
export default studentRouter;
