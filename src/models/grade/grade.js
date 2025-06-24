import mongoose from 'mongoose';

const StudentGradeSchema = new mongoose.Schema({
    student: {
        type: String,
        required: true,
        trim: true,
    }, regNumber: {
        type: String,
        required: true,
        trim: true,
    },
    course: {
        type: String,
        required: true,
        trim: true,
    },
    assignment: {
        type: Number,
        required: true,
        default: 0,
        max: [30, "Assignment marks cannot be more than 30"],
        min: [0, "Assignment marks cannot be more than 0"],
    },
    final: {
        type: Number,
        default: 0,
        max: [70, "Final marks cannot be more than 70"],
        min: [0, "Final marks cannot be more than 0"],
    },
    semester: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

const StudentGradeModel = mongoose.model('StudentGrade', StudentGradeSchema);

export default StudentGradeModel;