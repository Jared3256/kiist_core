import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {  GetObjectCommand } from "@aws-sdk/client-s3";

import asyncHandler from "express-async-handler";
import { s3 } from "../../config/aws/aws.config.js";
import system_data from "../../config/environment/env.constants.js";

const ReadAdminFiles = asyncHandler(async (key) => {

    const getObjectParams = {
        Bucket: system_data.AWS_BUCKETS_NAME,
        Key: key
    };

    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

    return url
});

export default ReadAdminFiles