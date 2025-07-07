import asyncHandler from "express-async-handler"
import StudentFinanceModel from "../../../models/student/student.finance.js";

const AdminStudentFinanceInformation = asyncHandler(async (req, res) => {
    try {
        const studentFinanceInfo = await StudentFinanceModel.find().populate("student")

        if (studentFinanceInfo.length < 1) {
            return res.status(417).json({
                message: "No student finance information was found",
                success: false
            })
        }

        return res.status(200).json({
            message: "Successfully found student finance records",
            success: true,
            data: studentFinanceInfo
        })
    } catch (err) {
        return res.status(422).json({
            message: "Unable to process student finance information",
            success: false,
        })
    }
})

export default AdminStudentFinanceInformation