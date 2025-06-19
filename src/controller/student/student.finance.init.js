import asyncHandler from "express-async-handler"
import StudentFinanceModel from "../../models/student/student.finance.js";

const StudentFinanceInitiator = asyncHandler(async (studentId, res) => {

    try {
        const result = await new StudentFinanceModel({
            student: studentId,
        }).save()

        if (!result) {
            return res.status(422).json({
                message: "unable to create your finance information. Contact your administrator.",
                success: false,
                data: null
            })
        }

    } catch (err) {
        return res.status(422).json({
            message: "unable to create your finance information. Contact your administrator.",
            success: false,
            data: null
        })
    }

})

export default StudentFinanceInitiator