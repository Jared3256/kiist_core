import asyncHandler from "express-async-handler";
import StudentPaymentHistoryModel from "../../../models/student/student.payment.history.js";
import StudentFinanceModel from "../../../models/student/student.finance.js";

const AdminStudentFinancePostPayment = asyncHandler(async (req, res) => {
    const {amount, paymentDate, paymentMethod, referenceNumber, studentId} = req.body;

    try {
        if (!amount || amount < 0 || !paymentDate || !paymentMethod || !referenceNumber || !studentId || String(studentId).length !== 24) {
            return res.status(411).json({
                message: "Invalid student payment details",
                success: false,
            })
        }

        // Check if the student fee has been posted
        const foundPayment = await StudentPaymentHistoryModel.findOne({
            student: studentId,
            amount: amount,
            receiptId: referenceNumber
        })

        if (foundPayment) {
            return res.status(409).json({
                message: "Student payment has already been recorded.",
                success: false
            })
        }

        //Check if the receipt Id has alreadt been created
        const foundReceipt = await StudentPaymentHistoryModel.find({
            receiptId: referenceNumber
        })

        if (foundReceipt.length > 0) {
            return res.status(409).json({
                message: "Receipt Id has already been recorded.",
                success: false
            })
        }
        const result = await new StudentPaymentHistoryModel({
            student: studentId,
            receiptId: referenceNumber,
            amount: amount,
            payment: paymentMethod,
            paymentDate: paymentDate,
            status: "completed"
        }).save()

        const foundStudentPayment = await StudentFinanceModel.findOne({
            student: studentId,
        })

        if (foundStudentPayment) {
            foundStudentPayment.amount_paid += Number(amount);
            await foundStudentPayment.save()
        }

        if (!result) {
            return res.status(422).json({
                message: "Unable to save payment details",
                data: null, success: false
            })
        }

        return res.status(200).json({
            message: "Payment has been posted successfully",
            success: true,
            data: result
        })
    } catch (e) {

        return res.status(422).json({
            message: "Unable to post student payment at the moment. Try again later. If issue persist, contact system admin",
            success: false,
        })
    }
})

export default AdminStudentFinancePostPayment