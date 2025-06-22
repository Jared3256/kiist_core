import asyncHandler from "express-async-handler";
import SessionModel from "../../models/session/sesion.js";

const CreateSession = asyncHandler(async (req, res) => {
    const {status, currentSemester, currentDeadline, notificationMessage} = req.body;

    try {
        if (!status || !currentSemester || !currentDeadline) {
            return res.status(411).json({
                message: "Invalid session data",
                success: false,
            })
        }

        // Check if a semester exist with the provided name
        const foundSemester = await SessionModel.findOne({
            currentSemester: currentSemester
        })

        if (foundSemester) {
            return res.status(409).json({
                message: "Semester already exists",
                success: false,
            })
        }

        const result = await new SessionModel({
            status: "Open",
            currentDeadline, currentSemester, notificationMessage
        }).save()

        if (!result) {
            return res.status(422).json({
                message: "unable to save session",
                success: false,
            })
        }

        res.status(201).json({
            success: true,
            message: "Session created successfully",
            data: result
        })
    } catch (e) {
        return res.status(422).json({
            message: "Unable to create the session",
            success: false,
        })
    }
})

export default CreateSession;