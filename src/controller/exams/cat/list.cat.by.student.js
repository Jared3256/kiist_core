import asyncHandler from "express-async-handler"
import StudentExamsCatModel from "../../../models/exams/student.exams.cat.js";
import CourseModel from "../../../models/app/course.model.js";

const ListCatByStudent = asyncHandler(async (req, res) => {
    const {id} = req.params

    try {
        if (!id || String(id).length !== 24) {
            return res.status(411).json({
                message: "Invalid request details",
                success: false
            })
        }

        const foundCats = await StudentExamsCatModel.find({
            student: id
        }).populate("code")


        if (foundCats.length < 1) {
            return res.status(417).json({
                message: "Did not find any CAT.",
                success: false
            })
        }

        const modifiedResults = await Promise.all(
            foundCats.map(async (result) => {
                console.log(result._doc.code, await CourseModel.findById(result._doc.code))
                return {
                    ...result._doc,
                }
            })
        )

        console.log(modifiedResults)
        return res.status(200).json({
            message: "found all of your cats",
            success: true,
            data: foundCats
        })
    } catch (e) {
        return res.status(422).json({
            message: "Cannot find your CATs, contact system administrator",
            success: false,
        })
    }
})

export default ListCatByStudent;