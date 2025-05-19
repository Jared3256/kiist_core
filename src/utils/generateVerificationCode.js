import jwt from "jsonwebtoken";

import { v7 as uuid } from "uuid";

const generateVerificationToken = () => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  console.log("code", code);

  return code;
};

export default generateVerificationToken;
