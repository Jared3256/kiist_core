import asyncHandler from "express-async-handler";
import studentProfileModel from "../../models/student/student.js";

const UpdateStudentAcademicBackground = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const {
        highestQualification,
        graduationYear,
        examIndexNumber,
        gradeAggregate,
        previousInstitution,
        intendedCourse,
        modeOfStudy,
        level
    } = req.body;

    if (String(id).length !== 24) {
        return res.status(412).json({
            message: "Invalid Student Id received",
            success: false,
            data: null
        })
    }

    // Check the authenticity of programming
    if (!highestQualification || !graduationYear || !examIndexNumber || !gradeAggregate || !modeOfStudy || !intendedCourse) {
        return res.status(412).json({
            message: "Crucial academic data is missing",
            success: false,
            data: null
        })
    }

    // const find student with the provided exam index number
    const foundStudentByIndex = await studentProfileModel.findOne({"academicBackground.examIndexNumber": examIndexNumber})

    if (foundStudentByIndex) {
        return res.status(409).json({
            success: false,
            message: "That exam index number has already been registered, proceed to next page",
            data: null
        })
    }
    const result = await studentProfileModel.findByIdAndUpdate(id, {
            $set: {
                academicBackground: {
                    highestQualification,
                    graduationYear,
                    examIndexNumber,
                    gradeAggregate,
                    previousInstitution,
                    intendedCourse,
                    modeOfStudy,
                    level
                }
            }
        },
        {new: true, runValidators: true})

    if (!result) {
        return res.status(404).json({
            message: "Student with that ID is not found",
            success: false,
            data: null
        });
    }
    return res.status(200).json({
        success: true,
        message: "successfully modified academic background",
        data: undefined
    })
})

export default UpdateStudentAcademicBackground