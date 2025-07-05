import asyncHandler from "express-async-handler";
import StudentAttendanceModel from "../../../models/student/student.attendance.js";
import UnitRegistrationModel from "../../../models/units/unit.model.js";
import studentProfileModel from "../../../models/student/student.js";
import {differenceInWeeks} from "date-fns";
import userModel from "../../../models/app/user.model.js";

const StudentAttendencePerformance = asyncHandler(async (req, res) => {

    const {regNumber, semester} = req.query;

    try {
        const result = await StudentAttendanceModel.find({
            regNumber: regNumber, semester: semester
        })

        if (result.length < 1) {
            return res.status(417).json({
                message: "Unable to find student previous attendance", success: false
            })
        }

        const student = await userModel.findOne({
            regNumber: regNumber, role: "student"
        })

        console.log(student)
        const foundUnits = await UnitRegistrationModel.find({student: student._id})

        if (foundUnits.length < 1) {
            return res.status(404).json({
                message: "No Registration Found",
                data: null,
                success: false
            })
        }

        const semester_month = String(semester).split(" - ")[0]

        let month = 1;
        switch (semester_month) {
            case "January":
                month = 1
                break
            case "May":
                month = 5
                break
            case "September":
                month = 9
                break
            default:
                break
        }

        const date = new Date()
        const year = date.getFullYear()
        const start = new Date(year, month - 1, 1)

        const number_of_weeks = differenceInWeeks(new Date(), start)
        console.log(number_of_weeks)
        //Assuming that each weeks each lesson is scheduled twice

        const total_classes = number_of_weeks * foundUnits.length * 2
        console.log(total_classes)
        const percentage = Math.ceil((result.length / total_classes) * 100)
        console.log(percentage)
        return res.status(200).json({
            message: "success",
            success: true,
            data: percentage,
        })
    } catch (e) {
        console.log(e)
        return res.status(422).json({
            message: "Failed to compute overrall student attendance",
        })
    }
})

export default StudentAttendencePerformance;