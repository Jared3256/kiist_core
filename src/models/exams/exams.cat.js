import mongoose from "mongoose";

const ExamsCatSchema = new mongoose.Schema({
        code: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "course",
            required: true
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        due_date: {
            type: Date,
            required: true,
        },
        due_time: {
            type: Date,
            required: true,
        },
        duration: {
            type: Number,
            required: true
        },
        late_submission: {
            type: Boolean,
            required: true
        },
        plagiarism_check: {
            type: Boolean,
            required: true
        },
        questions: [{
            question: String
        }],
        semester: String,
        tutor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "lecturer",
            required: true,
            trim: true,
        }

    }, {
        timestamp: true
    }
)

const ExamsCatModel = mongoose.model("ExamsCat", ExamsCatSchema);

export default ExamsCatModel;