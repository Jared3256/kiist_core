import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
    _id: String, // e.g., "LEC-2025"
    seq: {type: Number, default: 0},
});


const AdminCounterModel = mongoose.model("TutorCounter", counterSchema);

export default AdminCounterModel