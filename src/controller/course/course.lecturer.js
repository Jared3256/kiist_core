/**
 * Create a methods to find courses taught by some lecture
 */
import asyncHandler from "express-async-handler";
import CourseModel from "../../models/app/course.model.js";
import TutorModel from "../../models/tutor/Tutor.model.js";
import UnitRegistrationModel from "../../models/units/unit.model.js";

const CourseListByLecturer = asyncHandler(async (req, res) => {

    const {id} = req.params;

    try {

        if (!id || String(id).length !== 24) {
            return res.status(411).json({
                message: "Invalid Id request", success: false
            })
        }

        const tutor = await TutorModel.findById(id).populate("courses.units")

        if (tutor.courses.units.length < 1) {
            return res.status(417).json({
                message: "You have not been assigned any course.", success: false
            })
        }


        const modCourses = await Promise.all(
            tutor.courses.units.map(async (tutor) => {
                return {
                    ...tutor._doc, students: await UnitRegistrationModel.countDocuments({
                        unit: tutor
                    })
                }
            })
        )
        const return_data = {
            ...tutor.courses, units: modCourses
        }
        console.log({
            ...tutor.courses, units: modCourses
        })

        return res.status(200).json({
            message: "Success!",
            success: true,
            data: return_data
        })
    } catch (err) {
        console.log(err)

        return res.status(422).json({
            message: "Unable to find course assigned to you", success: false
        })
    }

})

export default CourseListByLecturer