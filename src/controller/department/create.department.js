import asyncHandler from "express-async-handler";
import UserModel from "../../models/app/user.model.js";
import DepartmentModel from "../../models/app/department.model.js";

const createDepartment = asyncHandler(async (req, res) => {
  const { name, head, code } = req.body;

  try {
    if (!name || !head || !code) {
      return res.status(412).json({
        success: false,
        message: "Provide department name and head of department.",
        data: null,
      });
    }

    // Check the length of the headOfDepartment
    if (String(head).length !== 24) {
      return res.status(416).json({
        success: true,
        message: "invalid department head id provided.",
        data: null,
      });
    }

    // Check if the department head id matches up any user in the database
    // The user MUST be a tutor as well
    const foundDepartmentHead = await UserModel.findOne({
      _id: head,
      role: { $in: ["tutor", "admin"] },
    });

    if (!foundDepartmentHead) {
      return res.status(412).json({
        message: "Id does not match any user, or id is not authorised",
        succes: false,
        data: null,
      });
    }

    //   Check if a deparment already exist with the name provided
    const foundDepartment = await DepartmentModel.findOne({
      name: name,
      headOfDepartment: head,
      departmentCode:code
    });

    if (foundDepartment) {
      return res.status(409).json({
        success: false,
        message: "department already exist",
        data: null,
      });
    }
    //create the department model and send to the database
    const department = await DepartmentModel({
      departmentName: name,
      headOfDepartment: head,
      departmentCode: code,
    }).save();

    if (!department) {
      return res.status(422).json({
        success: false,
        message: "unable to create the department. Try again later",
        data: null,
      });
    }

    return res.status(200).json({
      message: "department created successfully.",
      data: department,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "unable to create the department",
    });
  }
});

export default createDepartment;
