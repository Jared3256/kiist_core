import asyncHandler from "express-async-handler";
import UserModel from "../../models/app/user.model.js";
import UnitRegistrationModel from "../../models/units/unit.model.js";

const ApproveUnitRegistration = asyncHandler(async (req, res) => {
    const {adminId, regId, status} = req.body;
    
    try {
        if (!adminId || !regId || String(adminId).length !== 24 || String(regId).length !== 24) {
            return res.status(424).json({
                message: "Invalid Request ID",
                success: false,
            })
        }

        //     Find the admin user
        const adminUser = await UserModel.findOne({
            _id: adminId,
            role: "admin"
        })

        if (!adminUser) {
            return res.status(412).json({
                message: "No user found",
                success: false,
            })
        }

        const result = await UnitRegistrationModel.findOneAndUpdate({
            _id: regId
        }, {
            $set: {
                status: status
            }
        })

        if (!result) {
            return res.status(422).json({
                success: false,
                message: "Unable to approve unit registration",
                data: null
            })
        }

        return res.status(200).json({
            message: "Successfully updated unit",
            success: true,
            data: result
        })

    } catch (e) {
        return res.status(422).json({
            message: "unable to approve the unit",
            success: false,
            data: null
        })
    }
})

export default ApproveUnitRegistration;