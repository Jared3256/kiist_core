import mongoose from "mongoose"

const StudentFinanceSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudentProfile',
        required: true,
        unique: true,
        trim: true
    },
    total_fee: {
        type: Number,
        min: [0, "Student Total fee cannot be less than 0"],
        required: true,
        default: 0,
    },
    amount_paid: {
        type: Number,
        min: [0, "Paid fee cannot be less than 0"],
        required: true,
        default: 0
    }
})

const StudentFinanceModel = mongoose.model('StudentFinance', StudentFinanceSchema);

export default StudentFinanceModel