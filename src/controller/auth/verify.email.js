import asyncHandler from "express-async-handler"
import UserPassword from "../../models/app/UserPassword.js";
import UserModel from "../../models/app/user.model.js";
import {sendLecWelcomeEmail, sendWelcomeEmail} from "../../utils/mailtrap/email.js";

const VerifyEmail = asyncHandler(async (req, res) => {
    const {code} = req.body;
    const updates = {
        emailToken: null,
        emailTokenExpiresAt: null,
        emailVerified: true,
    };

    try {
        const userPasswordModel = await UserPassword.findOneAndUpdate(
            {
                emailToken: code,
                emailTokenExpiresAt: {$gt: Date.now()},
            },
            {
                $set: updates,
            },
            {
                new: true,
            }
        ).exec();

        if (!userPasswordModel) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification Token.",
            });
        }

        //   Get the user and activate their account
        const user = await UserModel.findById(userPasswordModel.user);

        user.enabled = true;

        await user.save();

        // send welcome email to the user

        if (user.role === "tutor") {
            await sendLecWelcomeEmail(user.email, user.email, user.email)
        } else {
            await sendWelcomeEmail(user.email, user.fullnamename);
        }


        res.status(200).json({
            message: "email verified successfully",
            success: true,
        });
    } catch (error) {
        console.log(error)
        return res.status(417).json({
            message: "error verifying account.",
            success: false,
        });
    }
})

export default VerifyEmail;