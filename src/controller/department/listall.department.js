import asyncHandler from "express-async-handler";
import DepartmentModel from "../../models/app/department.model.js";
import LecturerModel from "../../models/tutor/Tutor.model.js";
import ReadAdminFiles from "../admin/admin.get.files.js";
import CourseModel from "../../models/app/course.model.js";

const ListAllDepartment = asyncHandler(async (req, res) => {
    const departments = await DepartmentModel.find({
        active: true,
    });

    if (departments.length < 1) {
        return res.status(404).json({
            message: "no department found",
            data: null,
            success: false,
        });
    }
    const modifiedDepartments = await Promise.all(
        departments.map(async (department) => {

            return {
                ...department.toObject()
                , departmentHead: await LecturerModel.findById(department.headOfDepartment),
                courses: await CourseModel.countDocuments({
                    department: department._id
                })

            };
        })
    )

    console.log(modifiedDepartments)


    return res.status(200).json({
        message: "found all departments",
        success: true,
        data: modifiedDepartments,
    });
});

export default ListAllDepartment;
