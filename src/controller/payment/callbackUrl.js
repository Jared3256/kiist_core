import asyncHandler from "express-async-handler";
import StudentPaymentHistoryModel from "../../models/student/student.payment.history.js";

const handlerDarajaCallback = asyncHandler(async (req, res) => {

    console.log(JSON.stringify(req.body, null, 2))
    const data = JSON.stringify(req.body, null, 2)
    console.log("data", data)
    const resultCode = data.Body?.stkCallback?.ResultCode;
    let status
    if (resultCode === 2001) {
        status = "cancelled";
    } else {
        status = "success";
    }
    const receiptId =
        resultCode === 2001
            ? data.Body?.stkCallback?.MerchantRequestID
            : data.Body?.stkCallback?.CallbackMetadata?.item?.[1]?.value;

    const foundHistory = await StudentPaymentHistoryModel.findOneAndUpdate({
        receiptId: data.Body.stkCallback.MerchantRequestID
    }, {
        $set: {status: status, receiptId: receiptId}
    }, {new: true, runValidators: true})

    console.log(foundHistory)

    res.status(200).json({})
});

export default handlerDarajaCallback;
