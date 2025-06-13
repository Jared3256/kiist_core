import asyncHandler from "express-async-handler";
import CourseModel from "../../models/app/course.model.js";
import LecturerModel from "../../models/tutor/Tutor.model.js";
import DepartmentModel from "../../models/app/department.model.js";

const ListAllCourse = asyncHandler(async (req, res) => {
    const listCourse = await CourseModel.find();

    if (listCourse.length < 1) {
        return res.status(404).json({
            message: "no course found",
            success: false,
            data: null,
        });
    }


    const modifiedCourses = await Promise.all(
        listCourse.map(async (course) => {
            console.log("LLLLLLLL", await LecturerModel.findById(course.lecturer))

            return {
                ...course.toObject(),
                lecturer: await LecturerModel.findById(course.lecturer),
                department: await DepartmentModel.findById(course.department)
            };
        })
    )
    console.log("New courses", modifiedCourses)
    return res.status(200).json({
        message: "courses found",
        succes: true,
        data: modifiedCourses,
    });
});

export default ListAllCourse;
