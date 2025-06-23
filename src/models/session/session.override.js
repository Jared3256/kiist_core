import mongoose from 'mongoose'

const SessionOverrideSchema = new mongoose.Schema({
    id: String,
    name: String,
    overrideDate: {
        type: Date,
        default: Date.now()
    },
    reason: String,
    processedBy: String,
    semester: String
}, {
    timestamps: true,
})

const SessionOverrideModel = mongoose.model("SessionOverride", SessionOverrideSchema)

export default SessionOverrideModel