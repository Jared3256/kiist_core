import asyncHandler from "express-async-handler";
import SessionOverrideModel from "../../models/session/session.override.js";

const SessionOverrideList = asyncHandler(async (req, res) => {
    const {semester} = req.query;
    const list = await SessionOverrideModel.find({
        semester: semester
    })

    return res.status(200).json({
        message: 'Session Override List',
        data: list,
        success: true
    })
})

export default SessionOverrideList;