import asyncHandler from "express-async-handler";
import StudentSessionReportingModel from "../../models/student/student.session.reporting.js";
import studentProfileModel from "../../models/student/student.js";
import StudentFinanceModel from "../../models/student/student.finance.js";
import SessionOverrideModel from "../../models/session/session.override.js";
import SessionModel from "../../models/session/sesion.js";

const SessionStudentReportOverride = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const {currentSemester, regNumber, name, reason} = req.body;

    if (!id || !currentSemester || String(id).length !== 24 || !regNumber || !name || !reason) {
        return res.status(411).json({
            message: "Invalid request data",
            success: false,
        })
    }

    try {
        const findSession = await SessionModel.findOne({
            currentSemester: currentSemester
        })


        if (!findSession) {
            return res.status(417).json({
                message: "unable to find session",
                success: false,
            })
        }

        // Check if the student has already reported for the session
        const foundSession = await StudentSessionReportingModel.findOne({
            student: id,
            currentSemester: findSession._id
        })

        if (foundSession) {
            return res.status(201).json({
                message: "you have already reported",
                success: false,
                data: foundSession
            })
        }

        const result = await new StudentSessionReportingModel({
            student: id,
            currentSemester: findSession._id,
            reported: true
        }).save()


        // Find the finance mode of the student and create update the total fee
        const foundStudent = await studentProfileModel.findById(id);

        if (!foundStudent) {
            return res.status(417).json({
                message: "Failed to find student",
                success: false,
            })
        }
        // Find the student finance information with student id provided
        const studentLevel = String(foundStudent.programSelection.level)


        const studentFinanceInfo = await StudentFinanceModel.findOne({
            student: foundStudent._id,
        })

        let total = 0
        let save_result = {}
        if (!studentFinanceInfo) {
            save_result = await new StudentFinanceModel({
                student: id, total_fee: total
            }).save()

            if (!save_result) {
                return res.status(422).json({
                    message: "Unable to create the finance information. Kindly contact student finnace office.",
                    success: false,
                })
            }
        } else {
            save_result = studentFinanceInfo;
        }


        if (studentLevel === "DIP") {
            total = 20000 + save_result.total_fee
        } else {
            total = 18000 + save_result.total_fee
        }

        save_result.total_fee = total

        const save_result1 = await save_result.save()

        if (!save_result1) {
            return res.status(422).json({
                message: "Unable to create the finance information. Kindly contact student finnace office.",
                success: false,
            })
        }


        if (!result) {
            return res.status(422).json({
                message: "unable to report for the session",
                success: false,

            })
        }

        //Log the audit trails in the database

        const auditResult = await new SessionOverrideModel({
            id: regNumber,
            reason, name, processedBy: "Admin", semester: currentSemester
        }).save()
        if (!auditResult) {
            return res.status(422).json({
                message: "unable to report for the session",
                success: false,

            })
        }

        return res.status(200).json({
            message: "session reported",
            data: result,
            success: true
        })


    } catch (e) {

        return res.status(422).json({
            message: "unable to report you for the session. contact administrator",
            success: false,
        })
    }
})

export default SessionStudentReportOverride