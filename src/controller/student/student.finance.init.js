import asyncHandler from "express-async-handler"
import StudentFinanceModel from "../../models/student/student.finance.js";

const StudentFinanceInitiator = asyncHandler(async (studentId, res) => {

    try {
        //Check the student academic level and initiate FinanceModel with the standard flow
        let amount = 0;
        if (studentId.programSelection.level === "DIP") {
            amount = 20000
        } else {
            amount = 18000
        }
        
        const result = await new StudentFinanceModel({
            student: studentId._id,
            total_fee: amount
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