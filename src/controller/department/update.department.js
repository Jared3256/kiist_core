import asyncHandler from "express-async-handler";
import DepartmentModel from "../../models/app/department.model.js";

const UpdateDepartment = asyncHandler(async (req, res) => {
  const { departmentName, departmentCode, headOfDepartment, id } = req.body;

  // Remember to include the activate function to handle department activate
  try {
    if (!departmentName && !headOfDepartment && !departmentCode) {
      return res.status(421).json({
        message: "Unable to handle empty request.",
        success: false,
        data: null,
      });
    }

    // Check the length of the Id
    if (String(id).length !== 24) {
      return res.status(416).json({
        success: true,
        message: "invalid department id provided.",
        data: null,
      });
    }

    const updates = Object.entries({
      departmentName,
      departmentCode,
      headOfDepartment,
    }).reduce((acc, [key, val]) => {
      if (val != null) {
        acc[key] = val;
      }
      return acc;
    }, {});

    if (Object.keys(updates).length === 0) {
      return res.status(406).json({
        message: "Nothing to update—no non‐null fields provided.",
        success: false,
        data: null,
      });
    }

    const foundDepartment = await DepartmentModel.findByIdAndUpdate(
      id,
      {
        $set: {
          updates,
        },
      },
      { new: true, runValidators: true }
    );

    if (!foundDepartment) {
      return res.status(417).json({
        message: "Unable to Update the Department.",
        success: false,
        data: null,
      });
    }

    return res.status(200).json({
      message: "Department updated success",
      success: true,
      data: foundDepartment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to Update the Department.",
      success: false,
      data: null,
    });
  }
});

export default UpdateDepartment;
