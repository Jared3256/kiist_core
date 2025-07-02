import mongoose from "mongoose";

const StudentExamsCatSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StudentProfile",
        required: true
    },
    questions: [
        {
            answer: String,
            key: String,
            question: String,
            variant: String,
        }
    ],
    semester: String,
    submited_date: {
        type: Date,
        default: Date.now
    },
    submitted: {
        type: Boolean,
        default: false
    },
    grade: Number,
    code: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "course"
    }

}, {
    timestamps: true
})

const StudentExamsCatModel = mongoose.model("StudentExamsCat", StudentExamsCatSchema);

export default StudentExamsCatModel;