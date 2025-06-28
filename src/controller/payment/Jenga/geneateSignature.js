import crypto from "crypto";
import asyncHandler from "express-async-handler"
import system_data from "../../../config/environment/env.constants.js";


const GenerateJengaSignature = asyncHandler(async (message) => {


    const messageBuffer = Buffer.from(message, "utf-8");

    const privateKeyPem = Buffer.from(system_data.JENGA_PRIVATE_KEY, "base64").toString("utf-8");

    const sign = crypto.createSign("RSA-SHA256");
    sign.update(messageBuffer);
    sign.end();

    const signature = sign.sign(privateKeyPem, "base64");

    return signature
})
export default GenerateJengaSignature;