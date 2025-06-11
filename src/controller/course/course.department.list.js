import asyncHandler from "express-async-handler";
import CourseModel from "../../models/app/course.model.js";

const ListAllCourseByDepartment = asyncHandler(async (req, res) => {
  const { departmentId } = req.params;

  try {
    if (!departmentId || String(departmentId).length !== 24) {
      return res.status(417).json({
        message: "Invalid department Id",
        success: false,
        data: null,
      });
    }

    const listCourse = await CourseModel.find({
      department: departmentId,
    });

    if (listCourse.length < 1) {
      return res.status(404).json({
        message: "No course found in your department.",
        success: false,
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "found courses in your department",
      data: listCourse,
    });
  } catch (error) {
    return res.status(503).json({
      message: "server experienced an error",
      data: null,
      success: false,
    });
  }
});

export default ListAllCourseByDepartment;
