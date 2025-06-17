import asyncHandler from "express-async-handler";
import CourseModel from "../../models/app/course.model.js";
import UnitRegistrationModel from "../../models/units/unit.model.js";
import UserModel from "../../models/app/user.model.js";
import mongoose from "mongoose";

const RegisterUnit = asyncHandler(async (req, res) => {
    const {student, units} = req.body
    const session = await mongoose.startSession();
    session.startTransaction();
    try {


        if (!student || !units.length || units.length < 3) {
            return res.status(411).json({
                message: "Required Data is missing.",
                success: false,
                data: null
            })
        }

        for (const unit of units) {

            const foundRegistration = await UnitRegistrationModel.findOne({
                student, unit
            })

            if (foundRegistration) {
                await session.abortTransaction();
                session.endSession();

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
                await session.abortTransaction();
                session.endSession();

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
                await session.abortTransaction();
                session.endSession();

                return res.status(422).json({
                    message: "Unable to save registration", success: false, data: null
                })
            }


        }
        
        await session.commitTransaction();
        session.endSession();

        return res.status(201).json({
            success: true,
            data: {student, units},
            message: "Successfully registered"
        })

    } catch (e) {
        await session.abortTransaction();
        session.endSession();

        return res.status(422).json({
            message: "Unable to save registration", success: false, data: null
        })
    }

})

export default RegisterUnit;