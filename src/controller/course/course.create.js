import asyncHandler from "express-async-handler";
import CourseModel from "../../models/app/course.model.js";
import DepartmentModel from "../../models/app/department.model.js";
import UserModel from "../../models/app/user.model.js";
import LecturerModel from "../../models/tutor/Tutor.model.js";

const CreateCourse = asyncHandler(async (req, res) => {
    try {
        const {
            code,
            title,
            credits,
            department,
            lecturer,
            prerequisite,
        } = req.body;
        if (
            !code ||
            !title ||
            !credits ||
            !department ||
            !lecturer ||
            String(department).length !== 24
        ) {
            return res.status(424).json({
                message: "Required detials are missing",
                data: null,
                success: false,
            });
        }

        //   Check if the departmet exist
        const foundDepartment = await DepartmentModel.findById(department);
        if (!foundDepartment) {
            return res.status(417).json({
                message: "cannot link department id.",
                data: null,
                success: false,
            });
        }
        const foundLecturer = await LecturerModel.findOne({

            _id: lecturer,
        });
        if (!foundLecturer) {
            return res.status(417).json({
                message: "cannot link lecturer id.",
                data: null,
                success: false,
            });
        }

        //   Check if a course is already created.
        const foundCourse = await CourseModel.findOne({
            code: code,
            title: title,
        });

        if (foundCourse) {
            return res.status(409).json({
                message: "Course already created.",
                data: null,
                success: false,
            });
        }

        const result = await CourseModel({
            code,
            title,
            credits,
            department,
            lecturer,
            prerequisite,
        }).save();

        if (!result) {
            return res.status(422).json({
                message: "Unable to create course. Contact system-admin",
                data: null,
                success: false,
            });
        }

        return res.status(200).json({
            message: "course created successfully.",
            success: true,
            data: result,
        });
    } catch (error) {
        return res.status(500).json({
            message: "server experienced an error",
            data: null,
            success: false,
        });
    }
});

export default CreateCourse;
