import express from "express";
import createUnitRegistrationController from "../../controller/units_registration/createUnitRegistrationController.js";

const unitRegistrationRouter = express.Router();

unitRegistrationRouter.post("/student/create", createUnitRegistrationController.register)
unitRegistrationRouter.get("/student/:id/list", createUnitRegistrationController.student_list)
unitRegistrationRouter.put("/student/:id/cancel", createUnitRegistrationController.student_cancel)
export default unitRegistrationRouter;