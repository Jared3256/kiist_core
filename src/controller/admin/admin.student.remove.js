import asyncHandler from "express-async-handler"
import studentProfileModel from "../../models/student/student.js";

const AdminStudentRemove = asyncHandler(async (req, res) => {

    const {id} = req.params

    try {
        if (String(id).length !== 24) {
            return res.status(411).json({
                message: "Invalid ID",
                success: false
            })
        }

        const result = await studentProfileModel.findByIdAndDelete(id)

        if (!result) {
            return res.status(422).json({
                message: "unable to delete the student details",
                success: false,
                data: null
            })
        }

        return res.status(200).json({
            success: true,
            message: "successfully deleted student details",
            data: result
        })
    } catch (e) {
        return res.status(422).json({
            message: "unable to remove the student data"
        })
    }
})

export default AdminStudentRemove