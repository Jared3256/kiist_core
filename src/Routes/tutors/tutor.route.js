import express from "express";
import createCourseController from "../../controller/course/createCourseController.js";

const TutorRouter = express.Router();

//List all course by the lecturer id
TutorRouter.get("/:id/unit/list", createCourseController.list_by_lecturer)
export default TutorRouter;