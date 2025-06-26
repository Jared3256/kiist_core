import asyncHandler from "express-async-handler";
import StudentPaymentHistoryModel from "../../models/student/student.payment.history.js";
import StudentFinanceModel from "../../models/student/student.finance.js";

const handlerDarajaCallback = asyncHandler(async (req, res) => {

    const data = req.body;
    const resultCode = data?.Body?.stkCallback?.ResultCode;


    let status = resultCode !== 0 ? "cancelled" : "completed";


    const merchantRequestId = data?.Body?.stkCallback?.MerchantRequestID;
    const callbackMetadata = data?.Body?.stkCallback?.CallbackMetadata;

    const receiptId =
        resultCode !== 0
            ? merchantRequestId
            : callbackMetadata?.Item?.find(item => item.Name === "MpesaReceiptNumber")?.Value;


    const foundHistory = await StudentPaymentHistoryModel.findOne({
        receiptId: merchantRequestId
    })
    console.log(foundHistory)

    if (!foundHistory) {
        return res.status(417).json({
            message: "That request is not initiated from our end",
            success: false
        })
    }
    foundHistory.status = status;

    foundHistory.receiptId = receiptId;

    await foundHistory.save()

    if (foundHistory && resultCode === 0) {
        const foundStudentPayment = await StudentFinanceModel.findOne({
            student: foundHistory.student
        })

        if (foundStudentPayment) {
            foundStudentPayment.amount_paid += foundHistory.amount;
            await foundStudentPayment.save()
        }

    }
    res.status(200)
});

export default handlerDarajaCallback;
