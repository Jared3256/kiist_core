import asyncHandler from "express-async-handler";
import {addHours} from "date-fns";
import bcrypt from "bcryptjs";
import UserPassword from "../../models/app/UserPassword.js";
import {generate as uniqueId} from "shortid";
import generateVerificationToken from "../../utils/generateVerificationCode.js";
import UserModel from "../../models/app/user.model.js";

const createUser = asyncHandler(async (req, res) => {
    let {email, password, enabled, gender, fullname: fullName, role} = req.body;

    enabled = false;

    if (!fullName) {
        return res.status(400).json({
            status: "false",
            result: null,
            message: "Full name is required",
        });
    }

    if (!email || !email.includes("@") || !password) {
        return res.status(400).json({
            status: "false",
            result: null,
            message: "Email and password are required",
        });
    }

    if (req.body.role === "owner") {
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

    req.body.removed = false;

    const result = await new userModel({
        removed: false,
        email,
        password,
        enabled,
        gender,
        fullname: fullName,
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
        await UserModel.deleteOne({_id: result._id}).exec();

        return res.status(403).json({
            success: false,
            result: null,
            message: "couldn't save user correctly",
        });
    }

    // try {
    //   // Send verification email
    //   await sendVerificationEmail(email, verificationToken);
    // } catch (error) {
    //   // Delete the password
    //   const result = await UserPassword.findByIdAndDelete(resultPassword._id);

    //   // Remove the user
    //   let updates = {
    //     removed: true,
    //     enabled: false,
    //     email: "removed+" + uniqueId() + "+" + email,
    //   };

    //   // Find the document by id and delete it
    //   const result1 = await User.findOneAndUpdate(
    //     { _id: resultPassword.user },
    //     { $set: updates },
    //     {
    //       new: true, // return the new result instead of the old one
    //     }
    //   ).exec();
    //   return res.status(500).send({
    //     success: false,

    //     message:
    //       "cannot send verification token at the moment. contact system administrator",
    //   });
    // }

    return res.status(200).send({
        success: true,

        message: "User saved successfully",
    });
});


export default createUser;