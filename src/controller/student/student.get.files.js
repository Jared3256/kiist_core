import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

import asyncHandler from "express-async-handler";
import { s3 } from "../../config/aws/aws.config.js";
import system_data from "../../config/environment/env.constants.js";
const ReadStudentTranscript = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id || String(id).length !== 24) {
    return res.status(409).json({
      success: false,
      message: "Invalid student id",
      data: null,
    });
  }

  // TODO: Get the student details and send the give the url

  const getObjectParams = {
    Bucket: system_data.AWS_BUCKETS_NAME,
    Key: "f7690cbe7c3f8a9e1c2ce3a717422d1e68efe154368c22f89df796e57d95391a",
  };

  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

  return res.status(200).json({
    data: url,
    message: "document found",
    success: true,
  });
});

export { ReadStudentTranscript };
