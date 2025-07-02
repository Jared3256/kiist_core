import asyncHandler from "express-async-handler";
import ExamsCatModel from "../../../models/exams/exams.cat.js";

const ListCatByLecturer = asyncHandler(async (req, res) => {
    const {id} = req.params;

    try {
        if (!id || String(id).length !== 24) {
            return res.status(411).json({
                message: "Invalid lecturer id",
                success: false,
            })
        }

        const findAllCATs = await ExamsCatModel.find({
            tutor: id
        }).populate("code")

        if (findAllCATs.length < 0) {
            return res.status(417).json({
                message: "No previous CATs for this lecturer",
                success: false,
            })
        }

        return res.status(200).json({
            message: "Successfully found all CATs",
            data: findAllCATs,
            success: true,
        })
    } catch (err) {
        return res.status(422).json({
            message: "Unable to find your previous CATS"
        })
    }
})

export default ListCatByLecturer;