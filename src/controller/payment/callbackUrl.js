import asyncHandler from "express-async-handler";

const handlerDarajaCallback = asyncHandler(async (req, res) => {
    console.log(req.body)
    console.log(JSON.stringify(req.body, null, 2))

    res.status(200).json({})
});

export default handlerDarajaCallback;
