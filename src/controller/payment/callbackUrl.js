import asyncHandler from "express-async-handler";
import StudentPaymentHistoryModel from "../../models/student/student.payment.history.js";
import StudentFinanceModel from "../../models/student/student.finance.js";

const handlerDarajaCallback = asyncHandler(async (req, res) => {

    console.log(JSON.stringify(req.body, null, 2))
    const data = JSON.stringify(req.body, null, 2)
    console.log("data", data)
    const resultCode = data.Body?.stkCallback?.ResultCode;
    let status
    if (resultCode !== 0) {
        status = "cancelled";
    } else {
        status = "completed";
    }
    const receiptId =
        resultCode === 2001
            ? data.Body?.stkCallback?.MerchantRequestID
            : data.Body?.stkCallback?.CallbackMetadata?.item?.[1]?.value;

    const foundHistory = await StudentPaymentHistoryModel.findOne({
        receiptId: data?.Body?.stkCallback?.MerchantRequestID
    },)

    if (foundHistory && resultCode === 0) {
        foundHistory.status = status;
        foundHistory.receiptId = receiptId;
    }
    await foundHistory.save()

    const foundStudentPayment = await StudentFinanceModel.findOne({
        student: foundHistory.student
    })

    if (foundStudentPayment) {
        foundStudentPayment.amount_paid += foundHistory.amount;
    }

    await foundStudentPayment.save()
    console.log("Student.", foundStudentPayment, foundHistory)

    res.status(200)
});

export default handlerDarajaCallback;
