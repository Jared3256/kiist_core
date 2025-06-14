import asyncHandler from "express-async-handler";
import CourseModel from "../../models/app/course.model.js";
import UnitRegistrationModel from "../../models/units/unit.model.js";
import UserModel from "../../models/app/user.model.js";

const RegisterUnit = asyncHandler(async (req, res) => {
    const {student, unit} = req.body

    try {
        if (!student || !unit || String(student).length !== 24 || String(unit).length !== 24) {
            return res.status(411).json({
                message: "Required Data is missing.",
                success: false,
                data: null
            })
        }

        const foundRegistration = await UnitRegistrationModel.findOne({
            student, unit
        })

        if (foundRegistration) {
            return res.status(409).json({
                message: "Course already registered",
                success: false,
                data: null
            })
        }
        const foundStudent = await UserModel.findOne({
            _id: student,
        })

        const foundCourse = await CourseModel.findById(unit)

        if (!foundStudent || !foundCourse) {
            return res.status(417).json({
                message: "Id's does not match any student or Course",
                success: false,
                data: null
            })
        }

        const result = await new UnitRegistrationModel({
            student, unit
        }).save()

        if (!result) {
            return res.status(422).json({
                message: "Unable to save registration", success: false, data: null
            })
        }

        return res.status(201).json({
            success: true,
            data: result,
            message: "Successfully registered"
        })
    } catch (e) {
        console.log(e)

        return res.status(422).json({
            message: "Unable to save registration", success: false, data: null
        })
    }

})

export default RegisterUnit;