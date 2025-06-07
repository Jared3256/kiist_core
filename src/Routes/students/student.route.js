import express from "express";
import createStudentmiddleware from "../../controller/student/createStudentmiddleware.js";
import { multerUpload } from "../../config/firebase/firebase.config.js";

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
export default studentRouter;
