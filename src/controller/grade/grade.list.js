import asyncHandler from "express-async-handler";
import StudentGradeModel from "../../models/grade/grade.js";

const GradeList = asyncHandler(async (req, res) => {

    const {semester} = req.query
    try {
        const foundGrades = await StudentGradeModel.find({
            semester: semester
        })

        if (foundGrades.length < 1) {
            return res.status(417).json({
                message: "Did not find any grades for the current semester",
                success: false,
            })
        }
        return res.status(200).json({
            message: "Success!",
            success: true,
            data: foundGrades
        })
    } catch (e) {
        return res.status(422).json({
            message: "Failed to get grade list",
            success: false
        })
    }
})

export default GradeList