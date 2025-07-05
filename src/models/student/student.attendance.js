import mongoose from "mongoose"

const StudentAttendanceSchema = new mongoose.Schema({
    code: {
        required: true,
        trim: true,
        type: String
    },
    date: {
        type: Date,
        required: true,
    },
    regNumber: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        default: "approved",
        required: true,
        enum: ["pending", "approved"]
    },
    title: String,
    semester: String
}, {
    timestamps: true
})

const StudentAttendanceModel = mongoose.model("StudentAttendance", StudentAttendanceSchema)

export default StudentAttendanceModel