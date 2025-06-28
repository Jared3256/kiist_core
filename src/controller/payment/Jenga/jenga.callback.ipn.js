import asyncHandler from "express-async-handler";
import StudentPaymentHistoryModel from "../../../models/student/student.payment.history.js";
import StudentFinanceModel from "../../../models/student/student.finance.js";

const JengaCallbackIpn = asyncHandler(async (req, res) => {
    console.log(req.body)

    const {customer, transaction} = req.body;

    try {
        const foundHistory = await StudentPaymentHistoryModel.findOne({
            receiptId: customer.reference
        })

        if (!foundHistory) {
            return res.status(417).json({
                message: "That request is not initiated from our end",
                success: false
            })
        }

        foundHistory.status = transaction.status === "SUCCESS" ? "completed" : "cancelled";
        foundHistory.receiptId = transaction.reference;

        await foundHistory.save()

        if (foundHistory && transaction.status === "SUCCESS") {
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

export default JengaCallbackIpn