import asyncHandler from "express-async-handler";
import StudentFinanceModel from "../../../models/student/student.finance.js";
import studentProfileModel from "../../../models/student/student.js";

const StudentFinanceGetInformation = asyncHandler(async (req, res) => {
    const {id} = req.params;

    try {
        if (String(id).length !== 24) {
            return res.status(411).json({
                message: "Invalid student Id",
                success: false,
                data: null
            })
        }

        //     Find Student with the provided id
        const foundStudent = await studentProfileModel.findById(id);

        if (!foundStudent) {
            return res.status(417).json({
                message: "Failed to find student",
                success: false,
            })
        }

        // Find the student finance information with student id provided
        const studentLevel = String(foundStudent.programSelection.level)
        let total = 0
        if (studentLevel === "DIP") {
            total = 20000
        } else {
            total = 18000
        }

        console.log(studentLevel, total)

        const studentFinanceInfo = await StudentFinanceModel.findOne({
            student: id,
        })

        //If the information is not available then create a new instance since the student is existing in the database
        if (!studentFinanceInfo) {
            const save_result = await new StudentFinanceModel({
                student: id, total_fee: total
            }).save()

            if (!save_result) {
                return res.status(422).json({
                    message: "Unable to create the finance information. Kindly contact student finnace office.",
                    success: false,
                })
            }
        }

        return res.status(200).json({
            message: "finance information found",
            data: studentFinanceInfo,
            success: true,
        })
    } catch (e) {
        console.log(e)

        return res.status(422).json({
            message: "Unable to find student finance information. Contact finance office.",
            success: false,
            data: null
        })
    }
})

export default StudentFinanceGetInformation;