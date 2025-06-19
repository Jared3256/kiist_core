import mongoose from 'mongoose';

const studentCounterSchema = await mongoose.Schema({
    _id: String,
    seq: {type: Number, default: 0, required: true},

})

const studentCounterModel = mongoose.model('studentCounter', studentCounterSchema);
export default studentCounterModel