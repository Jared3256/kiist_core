import asyncHandler from "express-async-handler"
import StudentSessionReportingModel from "../../models/student/student.session.reporting.js";
import StudentFinanceModel from "../../models/student/student.finance.js";

const SessionStudentListType = asyncHandler(async (req, res) => {
    const {status, semester} = req.query

    try {
        if (!status || !semester) {
            return res.status(411).json({
                message: "category of student is required",
                success: false,
            })
        }

        const reported = status === "reported"


        const foundStudents = await StudentSessionReportingModel.find({
            reported: reported
        }).populate("student").populate("currentSemester")

        if (foundStudents.length < 1) {
            return res.status(417).json({
                message: "No student reporting history found"
            })
        }
        const modifiedStudent = await Promise.all(
            foundStudents.map(async (std) => {

                return {
                    ...std.toObject(),
                    feeStatus: await StudentFinanceModel.findOne({
                        student: std.student._id
                    })
                }
            })
        )

        const newModifiedStudent = modifiedStudent.filter((sem) => sem.currentSemester.currentSemester === semester)

        if (newModifiedStudent.length < 1) {
            return res.status(417).json({
                message: "No student reporting history found"
            })
        }
        return res.status(200).json({
            message: "success",
            success: true,
            data: newModifiedStudent
        })


    } catch (e) {
        console.log(e)
        return res.status(422).json({
            message: "unable to process the student list",
            success: false,
        })
    }
})

export default SessionStudentListType