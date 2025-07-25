import asyncHandler from "express-async-handler";
import StudentExamsCatModel from "../../../models/exams/student.exams.cat.js";
import {isToday} from "date-fns";

const StudentSubmitCat = asyncHandler(async (req, res) => {

    const {id} = req.params;
    const {student, questions, semester, code} = req.body;

    if (!code || !id || !student || String(id).length !== 24 || String(student).length !== 24 || id !== student || !semester) {
        return res.status(411).json({
            message: "Invalid Student ID"
        })
    }

    try {
        // find if the student has already submitted the CAT
        const foundCat = await StudentExamsCatModel.find({
            student: student, semester: semester, submitted: true, code: code
        })


        for (let i = 0; i < foundCat.length; i++) {
            // Check if the CAT is submitted today
            if (isToday(foundCat[i].submited_date)) {
                return res.status(409).json({
                    message: "CAT already submitted",
                    success: false,
                })

            }
            if (isToday(foundCat[i].submited_date)) {
                break
            }
        }

        const result = await new StudentExamsCatModel({
            student, questions, semester, submitted: true, grade: -1, code: code
        }).save()

        if (!result) {
            return res.status(400).json({
                message: "Unable to save your CAT. Contact System Admin",
                success: false,
            })
        }

        return res.status(200).json({
            message: "Successfully submitted",
            success: true,
            data: result
        })
    } catch (e) {
        console.log(e)

        return res.status(422).json({
            message: "Unable to save your CAT submition at the moment",
            success: false
        })
    }
})

export default StudentSubmitCat;