import asyncHandler from "express-async-handler";

const handlerDarajaCallback = asyncHandler(async (req, res) => {
  console.log("Body from Callback",req.body);
  return res.status(200).json({
    message: "success",
  });
});

export default handlerDarajaCallback;
