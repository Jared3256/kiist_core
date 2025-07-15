import asyncHandler from "express-async-handler"
import UserModel from "../../models/app/user.model.js";
import {generate as uniqueId} from "shortid";
import bcrypt from "bcryptjs";
import generateVerificationToken from "../../utils/generateVerificationCode.js";
import {addHours} from "date-fns";
import UserPassword from "../../models/app/UserPassword.js";
import {sendVerificationEmail} from "../../utils/mailtrap/email.js";
import userModel from "../../models/app/user.model.js";

const RegisterStudentAsUser = asyncHandler(async (email, regNumber, password, gender, fullname, role, res) => {
    const enabled = false,
        student_role = role || "student"


    try {
        if (role === "owner") {
            return res.status(403).send({
                success: false,
                result: null,
                message: "you can't create user with role owner",
            });
        }

        // Find if user already exists
        const existingUser = await UserModel.findOne({
            email: email,
            removed: false,
        });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                result: null,
                message: "An account with this information already exists. Kindly login",
            });
        }

        const salt = uniqueId();

        const passwordHash = bcrypt.hashSync(salt + password);

        const result = await new UserModel({
            removed: false,
            email,
            regNumber,
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


        const resultPassword = await new UserPassword(UserPasswordData).save();


        if (!resultPassword) {
            await userModel.deleteOne({_id: result._id}).exec();

            return res.status(403).json({
                success: false,
                result: null,
                message: "couldn't save user correctly",
            });
        }

        // Send verification email
        await sendVerificationEmail(email, verificationToken);
        return res.status(200).json({
            success: true,
            data: result,
            message: "Profile is complete kindly login."
        });
    } catch (e) {
        return res.status(422).json({
            message: "Unable to process your request successfully",
            success: false,
        })
    }

})

export default RegisterStudentAsUser