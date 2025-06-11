import asyncHandler from "express-async-handler";
import LecturerModel from "../../models/tutor/Tutor.model.js";

const ListAllTutors =  asyncHandler(async (req,res) => {
    const foundLecturers =  await LecturerModel.find()

    if (foundLecturers.length < 1){
        return res.status(417).json({
            message:"No lecturers found",
            success:false,
            data: null,
        })
    }

    return res.status(200).json({
        data:foundLecturers,
        success:true,
        message:"Success!",
    })
})

export default ListAllTutors;