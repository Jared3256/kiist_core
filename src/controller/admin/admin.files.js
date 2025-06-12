import asyncHandler from "express-async-handler";
import {  PutObjectCommand } from "@aws-sdk/client-s3";
import system_data from "../../config/environment/env.constants.js";
import crypto from "crypto"
import {s3} from "../../config/aws/aws.config.js"

const UploadAdminFiles = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const file = req.file;

    if (String(id).length !== 24) {
        return res.status(409).json({
            message: "invalid admin Id",
            data: null,
            success: false,
        });
    }

    try {
        const filename = crypto.randomBytes(32).toString("hex")
        const params = {
            Bucket: system_data.AWS_BUCKETS_NAME,
            Key: filename,
            Body: file.buffer,
            ContentType: file.mimetype,
        };
        const command = new PutObjectCommand(params);

        await s3.send(command);
        res.status(200).json({
            message: "document uploaded success",
            success: true,
            data: { url: filename },
        });
    } catch (error) {
        console.log(error);
        res.status(502).json({
            message: "document upload failed",
            success: false,
            data: null,
        });
    }
});

export default UploadAdminFiles;
