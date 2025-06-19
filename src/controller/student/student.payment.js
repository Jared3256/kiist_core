import asyncHandler from "express-async-handler";
import studentProfileModel from "../../models/student/student.js";

const UpdateStudentPaymentInfo = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const {registrationFee, paymentMethod, transactionRef} = req.body;

    if (String(id).length !== 24) {
        return res.status(412).json({
            message: "Invalid Student Id received",
            success: false,
            data: null
        })
    }

    // Check the authenticity of programming
    if (!registrationFee || !paymentMethod || !transactionRef) {
        return res.status(412).json({
            message: "Crucial payment data is missing",
            success: false,
            data: null
        })
    }

    // Check the amount of the fee paid
    if (registrationFee !== 1000) {
        return res.status(409).json({
            success: false,
            message: "Registration fee must be 1000",
            data: null
        })
    }
    // const find student with the provided exam index number
    const foundStudentById = await studentProfileModel.findById(id)

    const studentPaymentInfo = foundStudentById.paymentInfo

    if (studentPaymentInfo) {
        return res.status(409).json({
            success: false,
            message: "Registration fee already paid",
            data: null
        })
    }
    const result = await studentProfileModel.findByIdAndUpdate(id, {
            $set: {
                paymentInfo: {registrationFee, paymentMethod, transactionRef},
            }
        },
        {new: true, runValidators: true})

    if (!result) {
        return res.status(404).json({
            message: "Unable to complete payment at the moment.",
            success: false,
            data: null
        });
    }
    return res.status(200).json({
        success: true,
        message: "successfully paid registration fee. Kindly submit application",
        data: undefined
    })
})

export default UpdateStudentPaymentInfo