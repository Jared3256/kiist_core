import asyncHandler from "express-async-handler";
import CourseModel from "../../models/app/course.model.js";

const DeleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.body;

  try {
    if (!id || String(id).length !== 24) {
      return res.status(417).json({
        message: "invalid course id",
        success: false,
        data: null,
      });
    }

    const result = await CourseModel.findById(id);

    if (!result) {
      return res.status(422).json({
        message: "No course found for your id",
        data: null,
        success: false,
      });
    }

    // Check if the there are student registered to the course.
    
    return res.status(410).json({
      message: "course deleted.",
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(503).json({
      message: "server experienced an error",
      data: null,
      success: false,
    });
  }
});

export default DeleteCourse;
