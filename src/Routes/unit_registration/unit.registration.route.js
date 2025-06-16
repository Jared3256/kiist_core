import express from "express";
import createUnitRegistrationController from "../../controller/units_registration/createUnitRegistrationController.js";

const unitRegistrationRouter = express.Router();

// Student ony routes
unitRegistrationRouter.post("/student/create", createUnitRegistrationController.register)
unitRegistrationRouter.get("/student/:id/list", createUnitRegistrationController.student_list)
unitRegistrationRouter.put("/student/:id/cancel", createUnitRegistrationController.student_cancel)

// Admin Only routes
unitRegistrationRouter.get("/admin/:id/list", createUnitRegistrationController.admin_list)
unitRegistrationRouter.put("/:regId/admin/:adminId/approve", createUnitRegistrationController.admin_approve)
export default unitRegistrationRouter;