import asyncHandler from "express-async-handler";
import studentProfileModel from "../../models/student/student.js";

const UpdateStudentContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { email, mobilePhone, alternativePhone, currentAddress } = req.body;

  if (String(id).length !== 24) {
    return res.status(412).json({
      message: "Invalid Student Id received",
      success: false,
      data: null,
    });
  }

  // Check for the authenticity of the daata needed
  if (
    !email ||
    !alternativePhone ||
    !currentAddress ||
    !mobilePhone ||
    !alternativePhone
  ) {
    return res.status(412).json({
      message: "Invalid student contact details, kindly recheck",
      success: false,
      data: null,
    });
  }

  const foundStudent = await studentProfileModel.findByIdAndUpdate(
    id,
    {
      $set: {
        contactAddress: {
          email: email,
          mobilePhone: mobilePhone,
          alternativePhone: alternativePhone,
          currentAddress: currentAddress,
        },
      },
    },
    { new: true, runValidators: true }
  );

  if (!foundStudent) {
    return res.status(404).json({
      message: "Student not found",
      success: false,
      data: null,
    });
  }

  return res.status(200).json({
    success: true,
    id: id,
    data: req.body,
    message: "Successfully updated student contact. Proceed",
  });
});

export default UpdateStudentContact;
