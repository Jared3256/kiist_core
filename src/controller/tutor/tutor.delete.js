import asyncHandler from "express-async-handler";
import TutorModel from "../../models/tutor/Tutor.model.js";

const DeleteTutor = asyncHandler(async (req, res) => {
    const {id} = req.params;

//     Check the length of the id
    if(String(id).length !== 24){
        return res.status(411).json({
            success: false,
            message:"Invalid ID",
            data:null
        })
    }

    try {
        const result = await TutorModel.findByIdAndDelete(id)

        if(!result){
            return res.status(422).json({
                success: false,
                message:"Unable to delete Tutor",
                data: null
            })
        }

        return res.status(200).json({
            message:"Success!",
            success: true,
            data:result
        })
    }

    catch (e) {
        return res.status(422).json({
            success: false,
            message:"Unable to delete Tutor",
            data: null
        })
    }
})

export default DeleteTutor