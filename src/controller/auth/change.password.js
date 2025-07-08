import asyncHandler from "express-async-handler";
import {generate as uniqueId} from "shortid"
import bcrypt from "bcryptjs"
import UserPassword from "../../models/app/UserPassword.js";
import UserModel from "../../models/app/user.model.js";
import {sendResetSuccessEmail} from "../../utils/mailtrap/email.js";


const ChangePassword = asyncHandler(async (req, res) => {
    const {token} = req.query;

    const {password} = req.body

    try {
        if (!password || !token || String(password).length < 8) {
            return res.status(411).json({
                message: "The password needs to be at least 8 characters long.",
                success: false,
            })
        }

        const userPasswordModel = await UserPassword.findOne({
            resetToken: token,
            resetTokenExpiresAt: {
                $gt: Date.now(),
            },
        });

        if (!userPasswordModel) {
            return res.status(417).json({
                message: "iInvalid or expired Token",
            });
        }

        const salt = uniqueId();
        const passwordHash = bcrypt.hashSync(salt + password);

        userPasswordModel.password = passwordHash;
        userPasswordModel.salt = salt;
        userPasswordModel.resetToken = null;
        userPasswordModel.resetTokenExpiresAt = null;

        await userPasswordModel.save();
        const user = await UserModel.findById(userPasswordModel.user);

        await sendResetSuccessEmail(user.email);

        return res.status(200).json({message: "Password reset successful"});
    } catch (err) {
        return res.status(422).json({
            message: "Unable to change password",
            success: false,
        })
    }
})

export default ChangePassword;