import asyncHandler from "express-async-handler"
import UnitRegistrationModel from "../../models/units/unit.model.js";
import UserModel from "../../models/app/user.model.js";

const AdminUnitList = asyncHandler(async (req, res) => {
    const {id} = req.params

    try {
        if (!id || String(id).length !== 24) {
            return res.status(417).josn({
                message: "Invalid Admin Id",
                success: false,
                data: null
            })
        }

        const foundRegistrations = await UnitRegistrationModel.find().populate("unit")

        if (foundRegistrations.length < 1) {
            return res.status(404).json({
                message: "No student has registered for a unit",
                success: false,
                data: null
            })
        }

        const modifiedRegistrations = await Promise.all(
            foundRegistrations.map(async (registration) => {
                return {
                    ...registration.toObject(),
                    student: await UserModel.findById(registration.student)
                }
            })
        )


        return res.status(200).json({
            message: "Request success",
            data: modifiedRegistrations,
            success: true
        })

    } catch (e) {
        return res.status(422).json({
            message: e.message,
            success: false,
            data: null
        })
    }
})

export default AdminUnitList