import asyncHandler from "express-async-handler";
import StudentAttendanceModel from "../../../models/student/student.attendance.js";

const StudentAttendanceList = asyncHandler(async (req, res) => {
    const {id} = req.query;
    try {
        if (!id) {
            return res.status(411).json({
                message: "No student id found",
                success: false
            })
        }

        const result = await StudentAttendanceModel.find({
            regNumber: id
        })

        if (result.length < 1) {
            return res.status(417).json({
                message: "Unable to match any attendance",
                success: false
            })
        }

        return res.status(200).json({
            message: "success",
            success: true,
            data: result
        })
    } catch (e) {
        return res.status(422).json({
            message: "unable to find all your attendance this week",
            success: false
        })
    }

})

export default StudentAttendanceList;