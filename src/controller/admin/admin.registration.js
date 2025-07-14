import asyncHandler from "express-async-handler";
import userModel from "../../models/app/user.model.js";
import {generate as uniqueId} from "shortid";
import bcrypt from "bcryptjs";
import generateVerificationToken from "../../utils/generateVerificationCode.js";
import {addHours} from "date-fns";
import UserPassword from "../../models/app/UserPassword.js";
import UserModel from "../../models/app/user.model.js";
import {sendVerificationEmail} from "../../utils/mailtrap/email.js";

const AdminRegistration = asyncHandler(async (req, res) => {
    const {
        password, fullName, email, phoneNumber, role, securityAnswer, securityQuestion, staffId
    } = req.body

    try {
        const enabled = false
        if (!fullName) {
            return res.status(411).json({
                status: "false",
                result: null,
                message: "Full name is required",
            });
        }

        if (!email || !email.includes("@") || !password) {
            return res.status(411).json({
                status: "false",
                result: null,
                message: "Email and password are required",
            });
        }

        /**
         * Check if there is a super admin user already enrolled in the system
         */

        const foundUserAdmin = await userModel.find({
            role: "superadmin"
        })

        if (foundUserAdmin.length > 0) {
            return res.status(405).json({
                message: "Unable to add new a superadmin",
                success: false
            })
        }

        // Find if user already exists
        const existingUser = await userModel.findOne({
            email: email,
            removed: false,
        });

        if (existingUser)
            return res.status(400).json({
                success: false,
                result: null,
                message: "An account with this email already exists.",
            });

        if (password.length < 8)
            return res.status(400).json({
                success: false,
                result: null,
                message: "The password needs to be at least 8 characters long.",
            });

        const salt = uniqueId();
        const passwordHash = bcrypt.hashSync(salt + password);

        const result = await new userModel({
            removed: false,
            email,
            password,
            enabled,
            gender: "male",
            fullname: fullName,
            regNumber: staffId,
            role,
        }).save();

        if (!result) {
            return res.status(403).json({
                success: false,
                result: null,
                message: "document couldn't save correctly",
            });
        }

        const verificationToken = generateVerificationToken();
        const UserPasswordData = {
            securityAnswer: securityAnswer,
            securityQuestion: securityQuestion,
            password: passwordHash,
            salt: salt,
            user: result._id,
            emailVerified: false,
            emailToken: verificationToken,
            emailTokenExpiresAt: addHours(Date.now(), 1),
        };

        const resultPassword = await new UserPassword(UserPasswordData).save();


        if (!resultPassword) {
            await UserModel.deleteOne({_id: result._id}).exec();

            return res.status(403).json({
                success: false,
                result: null,
                message: "couldn't save user correctly",
            });
        }

        // Send verification email
        await sendVerificationEmail(email, verificationToken);
        return res.status(200).send({
            success: true,
            message: "User saved successfully",
        });
    } catch (e) {
        console.log(e)
        return res.status(422).json({
            message: "Unable to register the user",
            success: false
        })
    }
})

export default AdminRegistration;