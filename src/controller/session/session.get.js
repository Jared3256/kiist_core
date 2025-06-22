import asyncHandler from "express-async-handler";
import SessionModel from "../../models/session/sesion.js";

const GetCurrentSession = asyncHandler(async (req, res) => {
    const {session} = req.query

    console.log(session)

    try {
        if (!session) {
            return res.status(411).json({
                message: "session is required",
                success: false,
            })
        }

        const foundSession = await SessionModel.findOne({
            currentSemester: session
        })

        if (!foundSession) {
            return res.status(404).json({
                message: "session not found",
                success: false,
            })
        }

        return res.status(200).json({
            message: "session found",
            success: true,
            data: foundSession
        })
    } catch (e) {
        return res.status(422).json({
            message: "Unable to find session",
            success: false
        })
    }
})

export default GetCurrentSession