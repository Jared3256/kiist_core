import asyncHandler from "express-async-handler";
import studentProfileModel from "../../models/student/student.js";

const UpdateStudentProgramSelection = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { main, alternative } = req.body;

  if (String(id).length !== 24) {
    return res.status(412).json({
      message: "Invalid Student Id received",
      success: false,
      data: null,
    });
  }

  if (!main) {
    return res.status(412).json({
      message: "Crucial program data is missing",
      success: false,
      data: null,
    });
  }
  // Check the authenticity of programming
  if (
    !main.department ||
    !main.program ||
    !main.studyMode ||
    !main.intendedStartTerm
  ) {
    return res.status(412).json({
      message: "Crucial program data is missing",
      success: false,
      data: null,
    });
  }

  const result = await studentProfileModel.findByIdAndUpdate(
    id,
    {
      $set: {
        programSelection: {
          main,
          alternative,
        },
      },
    },
    { new: true, runValidators: true }
  );

  if (!result) {
    return res.status(404).json({
      message: "Student with that ID is not found",
      success: false,
      data: null,
    });
  }
  return res.status(200).json({
    success: true,
    message: "successfully modified Program Selection",
    data: result,
  });
});

export default UpdateStudentProgramSelection;
