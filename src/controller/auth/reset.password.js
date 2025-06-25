import asyncHandler from "express-async-handler";
import UserModel from "../../models/app/user.model.js";
import UserPassword from "../../models/app/UserPassword.js";
import {generateResetToken} from "../../utils/system.utils.js";
import {sendPasswordResetEmail} from "../../utils/mailtrap/email.js";

const ResetPassword = asyncHandler(async (req, res) => {
    const {email} = req.body;

    try {
        const user = await UserModel.findOne({email});

        if (!user) {
            return res
                .status(404)
                .json({message: `User with email [${email}] is not registered`, success: false});
        }

        // Generate reset token
        const resetToken = generateResetToken();
        const resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes

        const passwordModel = await UserPassword.findOne({
            user: user._id,
        });

        passwordModel.resetToken = resetToken;
        passwordModel.resetTokenExpiresAt = resetTokenExpiry;

        await passwordModel.save();

        // send email
        const link = `http://localhost:5173/auth/reset_password/${resetToken}`;
        console.log(link);
        await sendPasswordResetEmail(email, link);

        return res.status(200).json({
            success: true,
            message: "check your email for reset token",
        });
    } catch (error) {
        console.log(error)
    }
})

export default ResetPassword;