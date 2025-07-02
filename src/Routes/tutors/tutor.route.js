import express from "express";
import createCourseController from "../../controller/course/createCourseController.js";
import createEXAMControllerMiddleware from "../../controller/exams/createEXAMControllerMiddleware.js";

const TutorRouter = express.Router();

//List all course by the lecturer id
TutorRouter.get("/:id/unit/list", createCourseController.list_by_lecturer)

/**
 * Create CAT
 */

TutorRouter.post("/cat/create", createEXAMControllerMiddleware.create_cat)
TutorRouter.get("/:id/cat/list", createEXAMControllerMiddleware.list_cats_lecturer)
export default TutorRouter;