import asyncHandler from "express-async-handler";
import StudentAttendanceModel from "../../../models/student/student.attendance.js";
import {isToday} from "date-fns";

const StudentAttendanceMark = asyncHandler(async (req, res) => {
    const {code, date, regNumber, status, title, semester} = req.body

    try {
        if (!code || !date || !regNumber || !status || !title) {
            return res.status(411).json({
                message: "Invalid attendance details",
                success: false
            })
        }

        const foundAttendance = await StudentAttendanceModel.findOne({
            code: code, regNumber: regNumber, semester: semester
        })

        if (foundAttendance && isToday(foundAttendance?.date)) {
            return res.status(409).json({
                message: "Attendance already exists",
                success: false
            })
        }

        const result = await new StudentAttendanceModel({
            code: code, date: new Date(date), regNumber: regNumber, title: title, semester: semester
        }).save()

        if (!result) {
            return res.status(417).json({
                message: "Unable to mark attendance",
                success: false
            })
        }

        return res.status(200).json({
            message: "Successfully marked",
            success: true,
            data: result
        })
    } catch (e) {
        console.log(e)
        return res.status(422).json({
            message: "Unable to process attendance",
            sucess: false,
        })
    }
})

export default StudentAttendanceMark;