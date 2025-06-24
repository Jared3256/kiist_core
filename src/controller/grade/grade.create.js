import asyncHandler from "express-async-handler";
import StudentGradeModel from "../../models/grade/grade.js";

const GradeCreate = asyncHandler(async (req, res) => {
    const {student, regNumber, course, assignment, final, semester} = req.body
    console.log(req.body)

    try {
        if (!student || !regNumber || !course || !semester) {
            return res.status(411).json({
                message: "Required data is missing", success: false
            })
        }

        // Check if the student grades is already registered in the database for the current semester
        const foundStudentGrade = await StudentGradeModel.findOne({
            regNumber: regNumber,
            semester: semester,
            course: course,
        })

        if (foundStudentGrade) {
            return res.status(409).json({
                message: "Grade already exists",
                success: false
            })
        }


        const result = await new StudentGradeModel({
            student, regNumber, course, assignment, final, semester

        }).save()

        if (!result) {
            return res.status(417).json({
                message: "Unable to save", success: false
            })
        }
        return res.status(201).json({
            message: "Grade created successfully",
            success: true,
            data: result
        })
    } catch (error) {
        return res.status(422).json({
            message: 'Unable to save the student grade at the moment',
            success: false,
        })
    }
})

export default GradeCreate;