import UserModel from "../../models/app/user.model.js";
import asyncHandler from "express-async-handler";
const listAllUsers = asyncHandler(async (req, res) => {
  const page = 1,
    limit = 10;
  const skip = (page - 1) * limit;
  const users = await UserModel.find({ removed: false })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
  const totalUsers = await UserModel.countDocuments({ removed: false });

  if (totalUsers === 0) {
    return res.status(404).json({
      status: "error",
      message: "No users found",
    });
  }
  const totalPages = Math.ceil(totalUsers / limit);
  const response = {
    users,
    totalUsers,
    totalPages,
    currentPage: page,
  };
  return res.status(200).json({
    status: "success",
    message: "Users fetched successfully",
    data: response,
  });
});

export default listAllUsers;
