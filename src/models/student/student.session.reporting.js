import mongoose from "mongoose"

const StudentSessionReportingSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StudentProfile", required: true, trim: true,
    },
    currentSemester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Session",
        required: true
    },
    reportingDate: {
        type: Date,
        default: Date.now
    },
    reported: {
        type: Boolean,
        default: false,
        required: true,
    }
}, {
    timestamps: true
})

const StudentSessionReportingModel = mongoose.model("StudentSessionReporting", StudentSessionReportingSchema)

export default StudentSessionReportingModel