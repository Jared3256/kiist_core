import asyncHandler from "express-async-handler"
import DepartmentModel from "../../models/app/department.model.js";
import TutorModel from "../../models/tutor/Tutor.model.js";
import UserModel from "../../models/app/user.model.js";
import UserPasswordModel from "../../models/app/UserPassword.js";
import {generate as uniqueId} from "shortid";
import bcrypt from "bcryptjs";
import generateVerificationToken from "../../utils/generateVerificationCode.js";
import {addHours} from "date-fns";
import {generateRegNumber} from "./utils/generateRegNumber.js";
import {sendVerificationEmail} from "../../utils/mailtrap/email.js";

const CreateTutor = asyncHandler(async (req, res) => {
    const {email, photo, name, department, qualification, paymentScale, status} = req.body;


    if (!email || !photo || !name || !department || !qualification || !paymentScale || !status) {
        return res.status(417).json({
            message: "Required Data is missing",
            success: false,
            data: null
        })
    }

    try {
        // Check the length of the Id
        if (String(department).length !== 24) {
            return res.status(411).json({
                message: "Invalid ID.",
                success: false,
                data: null
            })
        }
        //     Find the department with the provided ID
        const foundDepartment = await DepartmentModel.findById(department)

        if (!foundDepartment) {
            return res.status(417).json({
                message: "Department not Found.",
                success: false,
                data: null
            })
        }

        // Find the lecturer witht the email provided
        const fondLect = await TutorModel.findOne({
            email: email
        })

        if (fondLect) {
            return res.status(409).json({
                message: "Tutor is already registered", success: false
            })
        }

        const result = await new TutorModel({
            photo, name, department, qualification, paymentScale, status, email
        }).save()

        if (!result) {
            return res.status(422).json({
                message: "Unable to create the tutor",
                success: false
                , data: null
            })
        }

        const reg = await generateRegNumber("tutor"),
            userResult = await new UserModel({
                enabled: false,
                email: email,
                fullname: name,
                regNumber: reg,
                role: "tutor",
                bio: photo
            }).save()

        if (!userResult) {
            return res.status(422).json({
                success: false,
                message: "unable to initiate user instance",
            })
        }
        // Create the password Model
        const emailToken = generateVerificationToken(),
            salt = uniqueId(),
            passwordHash = bcrypt.hashSync(salt + email),

            passwordResult = await new UserPasswordModel({
                user: userResult._id,
                emailToken: emailToken,
                password: passwordHash,
                salt: salt,
                emailVerified: false,
                emailTokenExpiresAt: addHours(Date.now(), 3),

            }).save()

        if (!passwordResult) {
            return res.status(200).json({
                message: "Unable to create user password", success: false
            })
        }
        // TODO: Send the email to the tutor to activate their account

        await sendVerificationEmail(email, emailToken);

        return res.status(200).json({
            data: result,
            success: true
            , message: "Successfully created tutor"
        })
    } catch (e) {
        return res.status(422).json({
            message: e.message,
            success: false,
            data: null
        })
    }


})

export default CreateTutor