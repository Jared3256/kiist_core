import mongoose from "mongoose"

const UnitRegistrationSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        trim: true,
        default: "pending",
        enum: ["pending", "approved", "rejected", "cancelled"],
    },
    unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
        required: true,
        trim: true,
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StudentProfile",
        required: true,
        trim: true,
    }
}, {
    timestamps: true
})

const UnitRegistrationModel = mongoose.model("UnitRegistration", UnitRegistrationSchema)


export default UnitRegistrationModel