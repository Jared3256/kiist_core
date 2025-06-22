import asyncHandler from "express-async-handler";
import SessionModel from "../../models/session/sesion.js";

const SessionToggle = asyncHandler(async (req, res, next) => {

    const {id} = req.params
    const {status} = req.body;

    try {
        if (!status || !id || String(id).length !== 24) {
            return res.status(411).json({
                message: "Invalid request data"
            })
        }

        const result = await SessionModel.findByIdAndUpdate({
            _id: id,
        }, {
            $set: {
                status: status,
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
            message: "Failed to update session",
            success: false,
        })
    }
})

export default SessionToggle;