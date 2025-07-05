import asyncHandler from "express-async-handler";
import StudentAttendanceModel from "../../../models/student/student.attendance.js";
import UnitRegistrationModel from "../../../models/units/unit.model.js";
import studentProfileModel from "../../../models/student/student.js";

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

        const student = await studentProfileModel.findOne({
            registrationNumber: regNumber
        })
        const foundUnits = await UnitRegistrationModel.find({
            student: student._id, status: {$in: ['pending', 'approved', "rejected"]}
        })


        if (foundUnits.length < 1) {
            return res.status(404).json({
                message: "No Registration Found",
                data: null,
                success: false
            })
        }


    } catch (e) {
        return res.status(422).json({
            message: "Failed to compute overrall student attendance",
        })
    }
})

export default StudentAttendencePerformance;