import asyncHandler from "express-async-handler";

const handlerDarajaCallback = asyncHandler(async (req, res) => {

    return res.status(200).json({
        message: "success",
    });
});

export default handlerDarajaCallback;
