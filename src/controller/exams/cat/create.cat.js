import asyncHandler from "express-async-handler";
import ExamsCatModel from "../../../models/exams/exams.cat.js";


const CreateCat = asyncHandler(async (req, res) => {

    const {
        code, description, due_date, due_time, duration, late_submission, plagiarism_check, questions, tutor, semester
    } = req.body;

    try {
        if (!code || !description || !due_date || !due_time || !late_submission || !duration || !questions || !tutor || !semester) {
            return res.status(411).json({
                message: "required details are missing.",
                success: false
            })
        }

        if (questions.length < 1) {
            return res.status(411).json({
                message: "You must provide at least one question.",
                success: false
            })
        }

        // Find if the CAT is already created
        const foundCAT = await ExamsCatModel.findOne({
            code: code,
            description: description,
            due_date: due_date,
            due_time: due_time,
            duration: duration,
            tutor: tutor, semester: semester
        })


        if (foundCAT) {
            return res.status(409).json({
                message: "CAT already exist.",
                success: false
            })
        }


        const result = await new ExamsCatModel({
            code,
            description,
            due_date,
            due_time,
            duration,
            late_submission,
            plagiarism_check,
            questions,
            tutor,
            semester
        }).save()

        if (!result) {
            return res.status(422).json({
                message: "Failed to save the CAT",
                success: false
            })
        }

        return res.status(201).json({
            success: true,
            message: "Cat created successfully.",
            data: result
        })
    } catch (e) {
        return res.status(422).json({
            message: "Unable to create the CAT",
            success: false,
        })
    }
});

export default CreateCat;