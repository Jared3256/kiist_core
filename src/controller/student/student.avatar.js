import asyncHandler from "express-async-handler";
import UserModel from "../../models/app/user.model.js";
import studentProfileModel from "../../models/student/student.js";
import ReadAdminFiles from "../admin/admin.get.files.js";

const StudentAvatar = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const {avatar} = req.body

    try {
        if (!id || !avatar || String(id).length !== 24) {
            return res.status(411).json({
                message: "Invalid data received!",
                success: false,
            })
        }

        const foundStudent = await studentProfileModel.findById(id)

        if (!foundStudent) {
            return res.status(417).json({
                message: "unable to find the student", success: false,
            })
        }

        const foundUser = await UserModel.findOneAndUpdate({
            regNumber: foundStudent.registrationNumber
        }, {
            $set: {
                bio: avatar
            },
        }, {new: true, runValidators: true})

        if (!foundUser) {
            return res.status(422).json({
                message: "Unable to update the student avatar", success: false
            })
        }
        const url = await ReadAdminFiles(avatar)
        return res.status(200).json({
            success: true, message: "Uploaded success",
            data: url
        })
    } catch (e) {
        return res.status(422).json({
            message: "Unable to update avatar!",
            success: false,
        })
    }
})

export default StudentAvatar;