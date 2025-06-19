import asyncHandler from "express-async-handler";

const c2b_register_url = asyncHandler(async (req, res) => {
    return res.status(200).json(
        {
            "ResultCode": "0",
            "ResultDesc": "Accepted",

        })
})

export default c2b_register_url