import asyncHandler from "express-async-handler"
import StudentGradeModel from "../../models/grade/grade.js";
import CourseModel from "../../models/app/course.model.js";

const GradeStudentGetByRegistration = asyncHandler(async (req, res) => {
    const {regNumber, semester} = req.query
    try {
        if (!regNumber || !semester) {
            return res.status(411).json({
                message: "Required information is not provided",
                success: false,
            })
        }

        const foundGrades = await StudentGradeModel.find({
            regNumber: regNumber,
            semester: semester,
        })

        if (foundGrades.length < 1) {
            return res.status(417).json({
                message: 'No grades found for the filter',
                success: false,
            })
        }

        let myGrades = []
        const modifiedGrades = await Promise.all(
            foundGrades.map(async (gradeGrade) => {


                    return {
                        ...gradeGrade._doc, course: await CourseModel.findOne({
                            code: gradeGrade.course
                        })
                    }
                }
            ))


        if (modifiedGrades.length < 1) {
            return res.status(417).json({
                message: 'No grades found for the filter',
                success: false,
            })
        }

        return res.status(200).json({
            message: "Successfully found grade",
            data: modifiedGrades,
            success: true,
        })
    } catch (e) {
        console.log(e)

        return res.status(422).json({
            message: 'Unable to find the grades for the student',
            success: false,
        })
    }
})

export default GradeStudentGetByRegistration