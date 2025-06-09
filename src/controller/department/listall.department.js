import asyncHandler from "express-async-handler";
import DepartmentModel from "../../models/app/department.model.js";

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

  return res.status(200).json({
    message: "found all departments",
    success: true,
    data: departments,
  });
});

export default ListAllDepartment;
