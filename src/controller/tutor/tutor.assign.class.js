import asyncHandler from "express-async-handler";
import LecturerModel from "../../models/tutor/Tutor.model.js";

const AssignClasses = asyncHandler(async (req, res) => {
    const {assignedCourses, lecturer, schedule} = req.body;

    if (String(lecturer).length !== 24) {
        return res.status(411).json({
            message: "Invalid Id",
            success: false,
            data: null
        })
    }

    try {
        const units = assignedCourses
        const result = await LecturerModel.findByIdAndUpdate(
            lecturer, {
                $set: {
                    courses: {
                        units,
                        schedule
                    }
                }
            }
        )

        if (!result) {
            return res.status(422).json({
                message: "Failed to assign courses",
                success: false,
                data: null
            })
        }

        return res.status(200).json({
            message: "Successfully Assigned",
            success: true,
            data: result
        })


    } catch (e) {
        return res.status(422).json({
            message: "Failed to assign courses",
            success: false,
            data: null
        })
    }
})

export default AssignClasses;