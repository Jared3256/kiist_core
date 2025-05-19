import { NetUser } from "../../models/net/user.net.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NetAuthentication } from "../../models/net/authentication.net.js";
import { NetDefaultUser } from "../../models/net/default.user.net.js";

// Function to create new Clients
// Access Public
// Endpoint /net/auth/create
const createUser = asyncHandler(async (req, res) => {
  // Get Username, password and email from the req

  const { username, password, email, phone_number } = req.body;
  // Check if neither is blank
  if (!username || !password || !email || !phone_number) {
    return res.status(400).json({ message: "Missing key information" });
  }

  // Check if the user is already registered
  const foundUser = await NetUser.findOne({ email });

  if (foundUser) {
    return res.status(409).json({ message: `${email} is already registered` });
  }
  // Check the length of the phone Number
  if (String(phone_number).length < 10) {
    return res
      .status(409)
      .json({ message: "invalid phone number received", success: false });
  }

  // hash the password before storing
  const hashedPassword = await bcrypt.hash(password, 16);

  // create and store the user to the database
  const newUser = new NetUser({
    email,
    username,
    password: hashedPassword,
    phone_number,
  });

  await newUser.save();

  res.status(201).json({
    success: true,
    message: "User created successfully",
    user: {
      ...newUser._doc,
      password: undefined,
    },
  });
});

// Function to login Clients
// Access Public
// Endpoint /net/auth/login
const netLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "critical information is missing", success: false });
  }

  const foundUser = await NetUser.findOne({
    email,
  });

  if (!foundUser) {
    return res.status(401).json({
      message: "user not found with the email provided",
      success: false,
    });
  }

  // Authenticate the user
  if (!bcrypt.compare(password, foundUser.password)) {
    return res.status(401).json({ message: "Unauthorised", success: false });
  }

  // Create and return the access token and user refresh token
  const accessToken = jwt.sign(
    {
      user: {
        email: foundUser.email,
        roles: foundUser.roles,
        username: foundUser.username,
        accountStatus: foundUser.accountStatus,
        phone_number: foundUser.phone_number,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1min",
    }
  );

  const refreshToken = jwt.sign(
    {
      user: {
        email: foundUser.email,
        roles: foundUser.roles,
        username: foundUser.username,
        accountStatus: foundUser.accountStatus,
        phone_number: foundUser.phone_number,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "6h",
    }
  );

  // create secure cookie with refresh token
  res.cookie("eutron_cookie", refreshToken, {
    http: true,
    secure: true,
    sameSite: "None",
    maxAge: 12 * 60 * 60 * 1000, //12 hour maximum time to live,
  });

  // Create new Authentication Model template
  const foundAuthentication = await NetAuthentication.findOne({
    userId: foundUser._id,
  });

  if (foundAuthentication) {
    foundAuthentication.accessToken = accessToken;
    foundAuthentication.refreshToken = refreshToken;
    foundAuthentication.lastLogin = Date.now();

    await foundAuthentication.save();
  } else {
    const authenticationModel = new NetAuthentication({
      userId: foundUser._id,
      accessToken,
      refreshToken,
    });

    await authenticationModel.save();
  }

  // sendAccessToken({accessToken})
  res.json({ accessToken });
});

// Function to update user details
// Access Restricted (private)
// Endpoint /net/api/update
const netUpdateUser = asyncHandler(async (req, res) => {
  const { username, phone_number, email } = req.body;

  // Get the Id from the req params
  const { id } = req.params;

  // Check the length of the id
  if (String(id).length !== 24) {
    return res.status(409).json({
      message: "user id format is mismatching",
      success: false,
    });
  }

  // Find the user with Id
  const foundUser = await NetUser.findById(id);

  if (!foundUser) {
    return res
      .status(417)
      .json({ message: "no user matches the Id", success: false });
  }

  if (username) {
    foundUser.username = username;
  }

  if (phone_number) {
    foundUser.phone_number = phone_number;
  }

  if (email) {
    foundUser.email = email;
  }

  // Save the user
  await foundUser.save();

  return res
    .status(200)
    .json({ message: "user details updated successfully", success: true });
});

// Function to list all users
// Access Public
// Endpoint /net/auth/api/users/listAll
const listAllUsers = asyncHandler(async (req, res) => {
  const users = await NetUser.find({}).select("-password");

  return res
    .status(200)
    .json({ message: "Found all users", users: [...users], success: true });
});

// Function to logout user
// Access Private
// Endpoint /net/auth/logout
export const netLogout = asyncHandler(async (req, res) => {
  // Get the token from the request
  const cookies = req.cookies;

  if (!cookies?.eutron_cookie) {
    return res.status(204).json({ message: "No token received", cookies });
  }

  const refreshToken = cookies.eutron_cookie;

  const authenticationModel = await NetAuthentication.findOne({ refreshToken });

  if (!authenticationModel) {
    return res
      .status(417)
      .json({ message: "problem logging out", success: false });
  }

  authenticationModel.accessToken = "";
  authenticationModel.refreshToken = "";

  await authenticationModel.save();
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None" });

  res.json({ message: "Logout successful" });
});

// Function to refresh the access token
// Access Public
// Endpoint /net/auth/refresh
export const netRefresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  console.log("🚀 ~ netRefresh ~ req.cookies:", req);

  if (!cookies?.eutron_cookie) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const refreshToken = cookies.eutron_cookie;
  console.log("🚀 ~ netRefresh ~ refreshToken:", refreshToken);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(401).json({ message: "Unauthorized Token" });

      const foundAuth = await NetAuthentication.findOne({ refreshToken });

      if (!foundAuth) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const accessToken = jwt.sign(
        {
          user: {
            email: foundUser.email,
            roles: foundUser.roles,
            username: foundUser.username,
            accountStatus: foundUser.accountStatus,
            phone_number: foundUser.phone_number,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1min",
        }
      );

      foundAuth.accessToken = accessToken;

      await foundAuth.save();
      res.json({ accessToken });
    })
  );
});

// Function to create default user
// Access Private
// Endpoint /net/api/user/d/create
export const netCreateDefaultUser = asyncHandler(async (req, res) => {
  const defaultUsers = await NetDefaultUser.find({});

  if (defaultUsers.length > 0) {
    return res
      .status(412)
      .json({ message: "the system can only allow one default user" });
  }

  const newDefaultUser = new NetDefaultUser({});

  await newDefaultUser.save();

  return res.status(200).json({
    message: "successfully created a default user",
    success: true,
    user: newDefaultUser._doc,
  });
});

// Function to delete default user
// Access Private
// Endpoint /net/api/user/d/:id/delete
export const netDeleteDefaultUser = asyncHandler(async (req, res) => {
  return res.status(423).json({
    message: "request cannot be processed at the moment",
    success: false,
  });
});

// Function to delete default user
// Access Private
// Endpoint /net/api/user/d/:id/delete
export const netUpdateDefaultUser = asyncHandler(async (req, res) => {
  return res.status(423).json({
    message: "request cannot be processed at the moment",
    success: false,
  });
});
// Function to delete default user
// Access Private
// Endpoint /net/api/user/d/:id/delete
export const netListDefaultUser = asyncHandler(async (req, res) => {
  return res
    .status(423)
    .json({
      message: "request cannot be processed at the moment",
      success: false,
    });
});

export { createUser, netLogin, netUpdateUser, listAllUsers };
