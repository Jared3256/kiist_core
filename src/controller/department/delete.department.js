import asyncHandler from "express-async-handler";

const DeleteDeparment = asyncHandler(async (req, res) => {
  return res.status(405).json({
    message:
      "You cannot delete a department after creation. Kindly deactivate if need be",
    success: false,
    data: null,
  });
});

export default DeleteDeparment;
