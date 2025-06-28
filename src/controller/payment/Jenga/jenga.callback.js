import asyncHandler from "express-async-handler";

const JengaCallback = asyncHandler(async (req, res) => {
    console.log(req.body)

})

export default JengaCallback;