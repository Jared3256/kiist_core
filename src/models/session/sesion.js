import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
    status: {
        type: String,
        default: "Closed",
        enum: ["Open", "Closed"],
        required: true,
        trim: true
    },
    currentSemester: {
        type: String,
        required: true,
        trim: true
    },
    currentDeadline: {
        type: Date,
        required: true,
        trim: true
    },
    notificationMessage: {
        type: String,
    }
}, {
    timestamps: true
})

const SessionModel = mongoose.model('Session', SessionSchema);

export default SessionModel;