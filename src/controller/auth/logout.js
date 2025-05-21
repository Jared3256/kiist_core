import asyncHandler from "express-async-handler"; 
import jwt from "jsonwebtoken"

const logout = asyncHandler(async (req, res) => {
  const cookies = req.cookies;

  const token = cookies.kiist_token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Problem logging out - token not found" });
  }
  const decoded = jwt.decode(token);

  if (!decoded) {
    return res
      .status(401)
      .json({ message: "Problem logging out - wrong token" });
  }

  res.clearCookie("kiist_token", {
    maxAge: null,
    sameSite: null,
    httpOnly: null,
    secure: null,
    domain: null,
    Path: undefined,
  });

  res.json({
    success: true,
    result: {},
    message: "Successfully logout",
  });
});

export default logout;
