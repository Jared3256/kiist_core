import asyncHandler from "express-async-handler";
import studentProfileModel from "../../models/student/student.js";

const UpdateStudentAcademicBackground = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    highSchoolName,
    highSchoolLocation,
    highSchoolStartDate,
    highSchoolEndDate,
    highSchoolQualification,
    highSchoolGrade,
    highSchoolTranscript,
    collegeName,
    collegeLocation,
    collegeStartDate,
    collegeEndDate,
    collegeDegree,
    collegeMajor,
    collegeGrade,
    collegeTranscript,
    certifications,
    certificationDocuments,
    additionalInfo,
  } = req.body;

  if (String(id).length !== 24) {
    return res.status(412).json({
      message: "Invalid Student Id received",
      success: false,
      data: null,
    });
  }

  if (
    !highSchoolName ||
    !highSchoolLocation ||
    !highSchoolStartDate ||
    !highSchoolEndDate ||
    !highSchoolQualification ||
    !highSchoolGrade ||
    !highSchoolTranscript
  ) {
    return res.status(412).json({
      message: "Crucial academic data is missing",
      success: false,
      data: null,
    });
  }
  // Check the authenticity of programming

  const result = await studentProfileModel.findByIdAndUpdate(
    id,
    {
      $set: {
        academicBackground: {
          secondarySchool: {
            name: highSchoolName,
            startDate: highSchoolStartDate,
            endDate: highSchoolEndDate,
            qualificationObtained: highSchoolQualification,
            finalGrade: highSchoolGrade,
            transcript: highSchoolTranscript,
          },
          college: {
            name: collegeName,
            location: collegeLocation,
            startDate: collegeStartDate,
            endDate: collegeEndDate,
            qualificationObtained: collegeDegree,
            major: collegeMajor,
            transcript: collegeTranscript,
            finalGrade: collegeGrade,
          },
          proffessionalQualification: {
            certifications,
            certificationDocuments,
          },
          academicInformation: additionalInfo,
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
    message: "successfully modified academic background",
    data: result,
  });
});

export default UpdateStudentAcademicBackground;
