import { S3Client } from "@aws-sdk/client-s3";
import system_data from "../environment/env.constants.js";


export const s3 = new S3Client({
  credentials: {
    accessKeyId: system_data.AWS_ACCESS_KEY,
    secretAccessKey: system_data.AWS_SECRET_KEY,
  },
  region: system_data.AWS_REGION,
});
