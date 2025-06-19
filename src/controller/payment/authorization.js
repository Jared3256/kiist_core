import asyncHandler from "express-async-handler";
import axios from "axios";
import system_data from "../../config/environment/env.constants.js";

const daraja_authorization = asyncHandler(async (req, res) => {
    const server_response = await axios.get(system_data.AUTHORIZATION_URI, {
        headers: {
            Authorization: `Basic ${system_data.BEARER}`,
        },
    });

    console.log(server_response.data.access_token)

    return server_response.data.access_token;
});

export default daraja_authorization;
