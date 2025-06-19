import asyncHandler from "express-async-handler";
import studentCounterModel from "../../../models/student/student.counter.schema.js";

const getNextSequence = asyncHandler(async (level, res) => {
    const year = new Date().getFullYear();

    const key = `${level}-${year}`;


    const updatedSequence = await studentCounterModel.findOneAndUpdate(
        {_id: key},
        {$inc: {seq: 1}},
        {new: true, upsert: true})

    if (!updatedSequence) {
        return res.status(404).json({
            success: false,
            message: "Server error",
            data: null
        })
    }
    return {seq: updatedSequence.seq, year: year}
})

export default getNextSequence;