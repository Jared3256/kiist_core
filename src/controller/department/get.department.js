import asyncHandler from "express-async-handler";
import UserModel from "../../models/app/user.model.js";
import DepartmentModel from "../../models/app/department.model.js";

const GetDepartment = asyncHandler(async (req, res) => {
    const { adminId, departmentId } = req.params;

    if(!adminId || !departmentId) {
        return res.status(424).json({
            success: false,
            message:"No id found"
        })
    }

    if(String(adminId).length !==24 || String(departmentId).length !==24) {
        return res.status(424).json({
            success: false,
            message:"Invalid id found"
        })
    }

//     Check if the AdminId is actual Admin
    const adminUser =  await UserModel.findOne({
        _id : adminId,
        role:"admin"
    })

    if(!adminUser) {
        return res.status(401).json({
            success: false,
            message:"No admin user found",
            data:null
        })
    }

//     Find the department with the id provided
    const foundDepartment = await DepartmentModel.findById(departmentId);

    if(!foundDepartment){
        return res.status(404).json({
            message:"Department not found",
            success:false,
            data:null
        })
    }

    return res.status(200).json({
        success: true,
        message:"Department found success",
        data:foundDepartment
    })
})

export default GetDepartment ;