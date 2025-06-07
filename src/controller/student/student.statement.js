import asyncHandler from "express-async-handler";
import studentProfileModel from "../../models/student/student.js";

const UpdateStudentStatement = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { statement, additionalInfo, special, honors } = req.body;

  if (String(id).length !== 24) {
    return res.status(412).json({
      message: "Invalid Student Id received",
      success: false,
      data: null,
    });
  }

  if (!statement) {
    return res.status(412).json({
      message: "Statement data is missing",
      success: false,
      data: null,
    });
  }

  const result = await studentProfileModel.findByIdAndUpdate(
    id,
    {
      $set: {
        personalStatement: {
          statement,
          additionalInfo: {
            curricular: additionalInfo,
            honors,
            circumstances: special,
          },
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
    message: "successfully modified Program Statement",
    data: result,
  });
});

export default UpdateStudentStatement;
