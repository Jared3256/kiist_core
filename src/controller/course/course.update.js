import asyncHandler from "express-async-handler";
import CourseModel from "../../models/app/course.model.js";

const UpdateCourse = asyncHandler(async (req, res) => {
  const { id, code, title, creditHours, department, lecturer, prerequisite } =
    req.body;
  try {
    if (!id || String(id).length !== 24) {
      return res.status(417).json({
        message: "Invalid course id",
        data: null,
        success: false,
      });
    }

    const updates = Object.entries({
      code,
      title,
      creditHours,
      department,
      lecturer,
      prerequisite,
    }).reduce((acc, [key, val]) => {
      if (val != null) {
        acc[key] = val;
      }
      return acc;
    }, {});

    if (Object.keys(updates).length === 0) {
      return res.status(406).json({
        message: "Nothing to update—no non‐null fields provided.",
        success: false,
        data: null,
      });
    }

    const foundCourse = await CourseModel.findByIdAndUpdate(
      id,
      {
        $set: {
          updates,
        },
      },
      { new: true, runValidators: true }
    );

    if (!foundCourse) {
      return res.status(417).json({
        message: "No Course matches your Id",
        data: null,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Course updated success",
      success: true,
      data: foundCourse,
    });
  } catch (error) {
    return res.status(503).json({
      message: "server experienced an error",
      data: null,
      success: false,
    });
  }
});

export default UpdateCourse;
