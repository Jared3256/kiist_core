import asyncHandler from "express-async-handler";
import ExamsCatModel from "../../../models/exams/exams.cat.js";

const ListStudentCat = asyncHandler(async (req, res) => {
    const {semester} = req.query

    if (!semester) {
        return res.status(411).json({
            message: "No semester found"
            , success: false
        })
    }

    const result = await ExamsCatModel.find().populate("code")

    if (result.length < 1) {
        return res.status(417).json({
            message: "No cat found",
            success: false
        })
    }

    return res.status(200).json({
        message: "success",
        data: result,
        success: true
    })
})

export default ListStudentCat