import asyncHandler from "express-async-handler";
import StudentPaymentHistoryModel from "../../../models/student/student.payment.history.js";
import StudentFinanceModel from "../../../models/student/student.finance.js";

const JengaCallback = asyncHandler(async (req, res) => {
    console.log(req.body)

    try {
        const {status, telcoReference, transactionReference} = req.body;

        let transaction_status = status ? "completed" : "cancelled"

        const foundHistory = await StudentPaymentHistoryModel.findOne({
            receiptId: transactionReference
        })

        if (!foundHistory) {
            return res.status(417).json({
                message: "That request is not initiated from our end",
                success: false
            })
        }

        foundHistory.status = transaction_status;

        foundHistory.receiptId = telcoReference || transactionReference;

        await foundHistory.save()

        if (foundHistory && status) {
            const foundStudentPayment = await StudentFinanceModel.findOne({
                student: foundHistory.student
            })

            if (foundStudentPayment) {
                foundStudentPayment.amount_paid += foundHistory.amount;
                await foundStudentPayment.save()
            }

        }

        res.status(200)
    } catch (e) {
        console.log(e)

    }

})

export default JengaCallback;