import mongoose from 'mongoose'

const StudentPaymentHistorySchema = new mongoose.Schema({
    receiptId: {
        type: String,
        required: true,
        trim: true,
    },
    paymentDate: {
        type: Date,
        required: true,
        trim: true,
        default: Date.now()
    },
    amount: {
        type: Number,
        required: true,
        trim: true,
        min: [1, "you cannot pay less than 1 shilling"],
    },
    payment: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        default: "pending",
        trim: true,
        enum: ["pending", "completed", "cancelled"]
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudentProfile',
        required: true
    }
})

const StudentPaymentHistoryModel = mongoose.model("StudentPaymentHistory", StudentPaymentHistorySchema)

export default StudentPaymentHistoryModel