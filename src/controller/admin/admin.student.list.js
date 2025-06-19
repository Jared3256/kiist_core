import asyncHandler from "express-async-handler";
import studentProfileModel from "../../models/student/student.js";


const AdminStudentList = asyncHandler(async (req, res) => {

    try {
        const foundStudents = await studentProfileModel.find();

        if (foundStudents.length < 1) {
            return res.status(404).json({
                message: "Student not found",
                success: false,
                data: null
            })
        }

        return res.status(200).json({
            message: "Successfully read student",
            success: true,
            data: foundStudents
        })
    } catch (e) {
        return res.status(422).json({
            message: "Unable to find student details",
            success: false,
            data: null
        })
    }
})

export default AdminStudentList;