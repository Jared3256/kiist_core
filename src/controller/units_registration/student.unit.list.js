import asyncHandler from "express-async-handler";
import UnitRegistrationModel from "../../models/units/unit.model.js";

const ListStudentRegisteredUnits = asyncHandler(async (req, res) => {
    const {id} = req.params;

    try {
        if (String(id).length !== 24) {
            return res.status(411).json({
                message: "Invalid student id",
                success: false,
                data: null
            })
        }

        const foundUnits = await UnitRegistrationModel.find({
            student: id, status: {$in: ['pending', 'approved', "rejected"]}
        }).populate("unit.department").populate("unit");

        if (foundUnits.length < 1) {
            return res.status(404).json({
                message: "No Registration Found",
                data: null,
                success: false
            })
        }


        return res.status(200).json({
            success: true,
            data: foundUnits,
            message: "Successfully found units"
        })
    } catch (err) {
        return res.status(422).json({
            message: "unable to find student registrations",
            success: false,
            data: null
        })
    }
})

export default ListStudentRegisteredUnits;