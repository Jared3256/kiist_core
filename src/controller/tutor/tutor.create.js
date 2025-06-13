import asyncHandler from "express-async-handler"
import DepartmentModel from "../../models/app/department.model.js";
import TutorModel from "../../models/tutor/Tutor.model.js";

const CreateTutor = asyncHandler(async (req, res) => {
    const {photo, name, department, qualification, paymentScale, status} = req.body;


    if (!photo || !name || !department || !qualification || !paymentScale || !status) {
        return res.status(417).json({
            message: "Required Data is missing",
            success: false,
            data: null
        })
    }

    try {
        // Check the length of the Id
        if (String(department).length !== 24) {
            return res.status(411).json({
                message: "Invalid ID.",
                success: false,
                data: null
            })
        }
        //     Find the department with the provided ID
        const foundDepartment = await DepartmentModel.findById(department)

        if (!foundDepartment) {
            return res.status(417).json({
                message: "Department not Found.",
                success: false,
                data: null
            })
        }

        const result = await TutorModel({
            photo, name, department, qualification, paymentScale, status
        }).save()

        if (!result) {
            return res.status(422).json({
                message: "Unable to create the tutor",
                success: false
                , data: null
            })
        }

        return res.status(200).json({
            data: result,
            success: true
            , message: "Successfully created tutor"
        })
    } catch (e) {
        return res.status(422).json({
            message: e.message,
            success: false,
            data: null
        })
    }


})

export default CreateTutor