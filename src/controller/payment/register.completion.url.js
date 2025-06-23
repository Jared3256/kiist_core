import asyncHandler from "express-async-handler";
import axios from "axios";
import system_data from "../../config/environment/env.constants.js";
import daraja_authorization from "./authorization.js";

const C2B_Register_url = asyncHandler(async (req, res) => {
    const token = await daraja_authorization(req, res);
    const server_response = await axios.post(system_data.C2B_REGISTER_URL, {
        "ShortCode": 174379,
        "ResponseType": "Completed",
        "ConfirmationURL": system_data.DEV_CALLBACK_URI,
        "ValidationURL": system_data.VALIDATION_URL,
    }, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })


})

export default C2B_Register_url;