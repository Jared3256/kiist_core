import asyncHandler from "express-async-handler";
import StudentGradeModel from "../../models/grade/grade.js";

const GradeEdit = asyncHandler(async (req, res) => {
    const {student, regNumber, course, assignment, final, semester} = req.body


    try {
        if (!student || !regNumber || !course || !semester) {
            return res.status(411).json({
                message: "Required data is missing", success: false
            })
        }

        // Check if the student grades is already registered in the database for the current semester
        const foundStudentGrade = await StudentGradeModel.findOneAndUpdate({
            regNumber: regNumber,
            semester: semester,
            course: course,
        }, {
            $set: {
                assignment: assignment,
                final: final
            }
        }, {new: true, runValidators: true})

        if (!foundStudentGrade) {
            return res.status(417).json({
                message: "Grade does not exists",
                success: false
            })
        }

        return res.status(201).json({
            message: "Grade created successfully",
            success: true,
            data: foundStudentGrade
        })
    } catch (error) {
        return res.status(422).json({
            message: 'Unable to save the student grade at the moment',
            success: false,
        })
    }
})

export default GradeEdit;