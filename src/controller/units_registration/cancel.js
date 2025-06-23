import asyncHandler from "express-async-handler";
import UnitRegistrationModel from "../../models/units/unit.model.js";
import UserModel from "../../models/app/user.model.js";

const CancelUnitRegistration = asyncHandler(async (req, res) => {
    const {student, unit} = req.body;

    try {
        if (!student || !unit || String(student).length !== 24 || String(unit).length !== 24) {
            return res.status(417).json({
                message: "Invalid Student or Unit Id passed.",
                data: null,
                success: false
            })
        }

        const foundStudent = await UserModel.findOne({
            _id: student, role: "student"
        })

        if (!foundStudent) {
            return res.status(409).json({
                message: "No student found",
                success: false,
                data: null,
            })
        }
        const result = await UnitRegistrationModel.findOneAndDelete({
            _id: unit
        }, {
            $set: {
                status: "cancelled"
            }

        }, {new: true, runValidators: true})

        if (!result) {
            return res.status(422).json({
                success: false,
                message: "Failed to cancel unit registration", data: null
            });
        }

        return res.status(200).json({
            message: "Successfully cancelled",
            data: result, success: true
        })
    } catch (e) {


        return res.status(422).json({
            success: false,
            message: "Failed to cancel unit registration", data: null
        });
    }
})

export default CancelUnitRegistration;