import asyncHandler from "express-async-handler";
import LecturerModel from "../../models/tutor/Tutor.model.js";
import ReadAdminFiles from "../admin/admin.get.files.js";

const ListAllTutors = asyncHandler(async (req, res) => {

    const foundLecturers = await LecturerModel.find().populate('department').populate('courses.units');
    if (foundLecturers.length < 1) {
        return res.status(417).json({
            message: "No lecturers found",
            success: false,
            data: null,
        })
    }

    const modifiedLecturers = await Promise.all(
        foundLecturers.map(async (lect) => {
            return {
                ...lect.toObject(),
                photo: await ReadAdminFiles(lect.photo)
            };
        })
    )

    return res.status(200).json({
        data: modifiedLecturers,
        success: true,
        message: "Success!",
    })
})

export default ListAllTutors;