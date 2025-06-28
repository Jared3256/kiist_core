import fs from "fs";
import crypto from "crypto";
import path from "path";
import asyncHandler from "express-async-handler"


const GenerateJengaSignature = asyncHandler(async (message) => {
    const privateKeyPath = path.resolve("privatekey.pem");

    const messageBuffer = Buffer.from(message, "utf-8");

    const privateKeyPem = fs.readFileSync(privateKeyPath, "utf-8");

    const sign = crypto.createSign("RSA-SHA256");
    sign.update(messageBuffer);
    sign.end();

    const signature = sign.sign(privateKeyPem, "base64");
    
    return signature
})
export default GenerateJengaSignature;