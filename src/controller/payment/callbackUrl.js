import asyncHandler from "express-async-handler";
import StudentPaymentHistoryModel from "../../models/student/student.payment.history.js";
import StudentFinanceModel from "../../models/student/student.finance.js";

const handlerDarajaCallback = asyncHandler(async (req, res) => {

    console.log("Raw Body:", JSON.stringify(req.body, null, 2));

    const data = req.body;
    const resultCode = data?.Body?.stkCallback?.ResultCode;

    console.log(resultCode)


    let status = resultCode !== 0 ? "cancelled" : "completed";

    const merchantRequestId = data?.Body?.stkCallback?.MerchantRequestID;
    const callbackMetadata = data?.Body?.stkCallback?.CallbackMetadata;

    const receiptId =
        resultCode === 2001
            ? merchantRequestId
            : callbackMetadata?.Item?.find(item => item.Name === "MpesaReceiptNumber")?.Value;


    const foundHistory = await StudentPaymentHistoryModel.findOne({
        receiptId: merchantRequestId
    },)

    if (foundHistory && resultCode === 0) {
        foundHistory.status = status;

        foundHistory.receiptId = receiptId;

        await foundHistory.save()

        const foundStudentPayment = await StudentFinanceModel.findOne({
            student: foundHistory.student
        })

        if (foundStudentPayment) {
            foundStudentPayment.amount_paid += foundHistory.amount;
            await foundStudentPayment.save()
        }
        console.log("Student.", foundStudentPayment, foundHistory)
    }
    res.status(200)
});

export default handlerDarajaCallback;
