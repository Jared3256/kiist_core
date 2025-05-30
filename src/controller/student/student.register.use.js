import asyncHandler from "express-async-handler"
import userModel from "../../models/app/user.model.js";
import req from "express/lib/request.js";
import {generate as uniqueId} from "shortid";
import bcrypt from "bcryptjs";
import generateVerificationToken from "../../utils/generateVerificationCode.js";
import {addHours} from "date-fns";
import UserPassword from "../../models/app/UserPassword.js";

const RegisterStudentAsUser = asyncHandler(async (email, password, gender, fullname, role, res) => {
    const enabled = false,
        student_role = role || "student"

    if (role === "owner") {
        return res.status(403).send({
            success: false,
            result: null,
            message: "you can't create user with role owner",
        });
    }

    // Find if user already exists
    const existingUser = await userModel.findOne({
        email: email,
        removed: false,
    });
    if (existingUser) {

        return res.status(400).json({
            success: false,
            result: null,
            message: "An account with this email already exists. Kindly login",
        });
    }

    const salt = uniqueId();

    const passwordHash = bcrypt.hashSync(salt + password);

    const result = await new userModel({
        removed: false,
        email,
        password,
        enabled,
        gender,
        fullname,
        role,
    }).save();

    if (!result) {
        return res.status(403).json({
            success: false,
            result: null,
            message: "Problem saving the creating user please try again.",
        });
    }

    const verificationToken = generateVerificationToken();
    const UserPasswordData = {
        password: passwordHash,
        salt: salt,
        user: result._id,
        emailVerified: false,
        emailToken: verificationToken,
        emailTokenExpiresAt: addHours(Date.now(), 1),
    };

    console.log(UserPasswordData);
    const resultPassword = await new UserPassword(UserPasswordData).save();

    console.log("saved password", resultPassword);
    if (!resultPassword) {
        await userModel.deleteOne({_id: result._id}).exec();

        return res.status(403).json({
            success: false,
            result: null,
            message: "couldn't save user correctly",
        });
    }

    return res.status(200).json({
        success: true,
        data: result,
        message: "Profile is complete kindly login."
    });
})

export default RegisterStudentAsUser