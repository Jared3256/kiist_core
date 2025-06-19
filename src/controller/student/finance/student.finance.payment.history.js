import asyncHandler from "express-async-handler";
import StudentPaymentHistoryModel from "../../../models/student/student.payment.history.js";

const StudentFinancePaymentHistory = asyncHandler(async (req, res) => {
    const {id} = req.params;

    try {
        if (String(id).length !== 24) {
            return res.status(411).json({
                message: "Invalid student ID",
                success: false

            })
        }

        const foundPayments = await StudentPaymentHistoryModel.find({
            student: id
        })

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
        return res.status(400).json({
            message: "Unable to get your payment details",
            success: false
        })
    }
})

export default StudentFinancePaymentHistory;