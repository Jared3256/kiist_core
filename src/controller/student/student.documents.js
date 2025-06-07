import asyncHandler from "express-async-handler";
import studentProfileModel from "../../models/student/student.js";

const UpdateStudentDocumentInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const {
    identificationDocument,
    passportPhoto,
    academicCertificates,
    academicTranscripts,
    recommendationLetters,
    cvResume,
    englishProficiency,
    additionalDocuments,
    documentNotes,
  } = req.body;

  if (!identificationDocument || !passportPhoto || !academicCertificates) {
    return res.status(409).json({
      message: "required identification documents are missing.",
      success: false,
      data: null,
    });
  }

  // Check the length of the student Id passed
  if (String(id).length !== 24) {
    return res.status(403).json({
      message: "Invalid student id received.",
      success: false,
      data: null,
    });
  }

  const foundStudent = await studentProfileModel.findByIdAndUpdate(
    id,
    {
      $set: {
        documentInfo: {
          identificationDocument,
          passportPhoto,
          academicCertificates,
          academicTranscripts,
          recommendationLetters,
          cvResume,
          englishProficiency,
          additionalDocuments,
          documentNotes,
        },
      },
    },
    { new: true, runValidators: true }
  );

  if (!foundStudent) {
    return res.status(403).json({
      message: "Unable to correctly save your documents. kindly try again.",
      success: false,
      data: null,
    });
  }

  return res.status(200).json({
    message: "student document have been saved successfully.",
    success: true,
    data: foundStudent,
  });
});

export default UpdateStudentDocumentInfo;
