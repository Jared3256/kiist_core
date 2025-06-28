import asyncHandler from "express-async-handler";
import axios from "axios"
import system_data from "../../../config/environment/env.constants.js";


const JengaAuthorization = asyncHandler(async (req, res) => {
    try {
        const data = await axios.post(system_data.JENGA_DEV_AUTHORIZATION_URL,
            {
                "merchantCode": system_data.JENGA_MERCHANT_CODE,
                "consumerSecret": system_data.JENGA_CONSUMER_SECRET
            }, {
                headers: {
                    "Api-Key": system_data.JENGA_API_KEY,
                    "Content-Type": "application/json"
                }
            }
        )

        if (data.data.accessToken) {
            // return res.status(200).json({
            //     data: data.data
            // })

            return data.data.accessToken
        } else {
            return res.status(417).json({
                message: "unable to authenticate prcess",
                success: false
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(422).json({
            message: "unable to initiate payment",
            success: false,
        })
    }
})

export default JengaAuthorization