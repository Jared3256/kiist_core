import asyncHandler from "express-async-handler";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import UserModel from "../../models/app/user.model.js";

import PasswordModel from "../../models/app/UserPassword.js";
import studentProfileModel from "../../models/student/student.js";
import ReadAdminFiles from "../admin/admin.get.files.js";

const LoginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    let foundUser = {}

    if (String(email).endsWith(".com")) {
        foundUser = await UserModel.findOne({
            email: email,
            removed: false,
            enabled: true,
        });
    } else {

        foundUser = await UserModel.findOne({
            regNumber: email,
            removed: false,
            enabled: true,
        });
    }


    if (foundUser && foundUser.enabled === false) {
        return res.status(403).json({
            message: "User is not enabled",
        });
    }

    if (!foundUser) {
        return res.status(401).json({
            message: "Invalid email or password. Make sure your email is verified",
        });
    }

    let entity = {}
    if (foundUser.role === "student") {
        entity = await studentProfileModel.findOne({
            registrationNumber: email
        })
    }
    const databasePassword = await PasswordModel.findOne({
        user: foundUser._id,
        removed: false,
        emailVerified: true,
    });
    if (!databasePassword) {
        return res.status(401).json({
            success: false,
            message: "Unable to process this login. Your email is not verified",
            data: null
        })
    }

    if (!databasePassword.salt) {
        return res.status(403).json({
            success: false,
            result: null,
            message:
                "Unable to properly authenticate your account. Please contact support.",
        });
    }
    const isMatch = await bcrypt.compare(
        databasePassword.salt + password,
        databasePassword.password
    );

    if (!isMatch)
        return res.status(403).json({
            success: false,
            result: null,
            message: "Invalid credentials.",
        });

    if (isMatch === true) {
        const accessToken = jwt.sign(
            {
                UserInfo: {
                    id: foundUser._id,
                    removed: foundUser.removed,
                    enabled: foundUser.enabled,
                    regNumber: foundUser.regNumber,
                    email: foundUser.email,
                    fullname: foundUser.fullname,
                    created: foundUser.created,
                    role: foundUser.role,
                    entity: entity,
                    bio: foundUser.bio ? await ReadAdminFiles(foundUser.bio) : "NAN"
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "30min",
            }
        );

        const refreshToken = jwt.sign(
            {
                UserInfo: {
                    id: foundUser._id,
                    removed: foundUser.removed,
                    enabled: foundUser.enabled,
                    regNumber: foundUser.regNumber,
                    email: foundUser.email,
                    fullname: foundUser.fullname,
                    created: foundUser.created,
                    role: foundUser.role,
                    bio: foundUser.bio ? await ReadAdminFiles(foundUser.bio) : "NAN"
                },
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: "24h",
            }
        );

        res
            .status(200)
            .cookie("kiist_token", refreshToken, {
                maxAge: 24 * 60 * 60 * 1000,
                sameSite: "None",
                httpOnly: true,
                secure: true,
                domain: req.hostname,
                path: "/",
                Partitioned: true,
            })
            .json({
                success: true,
                accessToken,
                message: "Successfully login user",
            });
    } else {
        return res.status(403).json({
            success: false,
            result: null,
            message: "Invalid credentials.",
        });
    }
});

export default LoginUser;
