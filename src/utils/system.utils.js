import jwt from "jsonwebtoken";
import {v7 as uuid} from "uuid";

const generateVerificationToken = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Verification Code", code);
    return code;
};

const generateTokenAndSetCookie = (res, id) => {
    const token = jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return token;
};

const generateResetToken = () => {
    let token = "";
    token = String(uuid());
    console.log("Token ", token);
    return token;
};


export {
    generateResetToken,
    generateVerificationToken,
    generateTokenAndSetCookie,
};