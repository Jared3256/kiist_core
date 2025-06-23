import asyncHandler from "express-async-handler";
import SessionModel from "../../../models/session/sesion.js";
import StudentSessionReportingModel from "../../../models/student/student.session.reporting.js";

const SessionStudentGet = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const {session} = req.query;


    try {

        if (!id || !session || String(id).length !== 24) {
            return res.status(411).json({
                message: "Invalid request data",
                success: false,
            })
        }
        const foundSession = await StudentSessionReportingModel.find({
            student: id,

        }).populate("currentSemester")

        const foundData = foundSession.filter((sess) => sess.currentSemester.currentSemester === session)[0]


        if (!foundData) {
            return res.status(417).json({
                message: "Session not found",
                success: false,
            })
        }

        return res.status(200).json({
            message: "found session",
            data: foundData, success: true
        })
    } catch (e) {


        return res.status(400).json({})
    }
})

export default SessionStudentGet;