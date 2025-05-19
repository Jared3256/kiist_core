import express from "express";
import {
  createUser,
  netLogin,
  netUpdateUser,
  listAllUsers,
  netLogout,
  netRefresh,
  netCreateDefaultUser,
  netDeleteDefaultUser,
  netUpdateDefaultUser,
  netListDefaultUser,
} from "../../controller/net/netUserController.js";


const userRouter = express.Router();

// create user Endpoint
// Method POST
userRouter.route("/auth/create").post(createUser);

// Login User Endpoint
// Method POST
userRouter.route("/auth/login").post(netLogin);

// Update user details Endpoint
// Method PUT
userRouter.route("/api/user/:id/update").put(netUpdateUser);

// List all users
// Method GET
userRouter.route("/auth/api/users/listAll").get(listAllUsers);
// Logout user
// Method POST
userRouter.route("/auth/logout").post(netLogout)

// Refresh Token
// Method GET
userRouter.route("/auth/refresh").get(netRefresh)

// Create new default User
// Method POST
userRouter.route("/api/user/d/create").post(netCreateDefaultUser)

// Delete default user
// Method DELETE
userRouter.route("/api/user/d/:id/delete").delete(netDeleteDefaultUser)

// Update default user
// Method PUT
userRouter.route("/api/user/d/:id/update").put(netUpdateDefaultUser)


// List default user
// Method GET
userRouter.route("/api/user/d/listAll").get(netListDefaultUser)

export default userRouter;
