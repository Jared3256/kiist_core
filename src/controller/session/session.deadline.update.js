import asyncHandler from "express-async-handler";
import SessionModel from "../../models/session/sesion.js";

const SessionDeadlineUpdate = asyncHandler(async (req, res) => {
    const {id} = req.params
    const {currentDeadline} = req.body;


    try {

        if (!currentDeadline || !id || String(id).length !== 24) {
            return res.status(411).json({
                message: "Invalid request data"
            })
        }

        const result = await SessionModel.findByIdAndUpdate({
            _id: id,
        }, {
            $set: {
                currentDeadline: currentDeadline,
            }
        }, {new: true, runValidators: true})

        if (!result) {
            return res.status(422).json({
                message: "Unable to update the semester",
                success: false
            })
        }

        return res.status(200).json({
            message: "Successfully updated session",
            success: true,
            data: result
        })
    } catch (e) {
        return res.status(422).json({
            message: "Unable to update session deadline",
            success: false,
        })
    }
})

export default SessionDeadlineUpdate;