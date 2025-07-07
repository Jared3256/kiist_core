import asyncHandler from "express-async-handler";
import StudentPaymentHistoryModel from "../../../models/student/student.payment.history.js";

const AdminStudentFinancePaymentHistory = asyncHandler(async (req, res) => {
    try {
        const foundPayments = await StudentPaymentHistoryModel.find()

        if (foundPayments.length < 1) {
            return res.status(417).json({
                message: "Unable to find student payments",
                success: false,
                data: null
            })
        }

        return res.status(200).json({
            message: "Successfully found student payments",
            data: foundPayments,
            success: true
        })

    } catch (err) {
        return res.status(422).json({
            message: "unable to get finance records",
            success: false,
        })
    }
})

export default AdminStudentFinancePaymentHistory;

