import asyncHandler from "express-async-handler";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import createError from "http-errors";
import { firestore } from "../../config/firebase/firebase.config.js";

const UploadStudentFiles = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const file = req.file;

  if (String(id).length !== 24) {
    return res.status(409).json({
      message: "invalid student Id",
      data: null,
      success: false,
    });
  }

  try {
    const filename = new Date().getTime() + "-" + file.originalname;
    const imageRef = ref(firestore, `students/${id}/` + filename);
    const snapshot = await uploadBytes(imageRef, file.buffer);
    const imageURL = await getDownloadURL(snapshot.ref);
    res.status(200).json({
      message: "document uploaded success",
      success: true,
      data: { url: imageURL },
    });
  } catch (error) {
    console.log(error)
    res.status(502).json({
      message: "document upload failed",
      success: false,
      data: null,
    });
  }
});

export default UploadStudentFiles;
