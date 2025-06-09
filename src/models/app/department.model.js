import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    departmentName: {
      required: [true, "department name must be provided"],
      unique: true,
      trim: true,
      type: String,
    },
    departmentCode: {
      required: true,
      unique: true,
      type: String,
      trim: true,
      uppercase: true,
    },
    active: {
      default: true,
      type: Boolean,
    },
    headOfDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const DepartmentModel = mongoose.model("department", departmentSchema);

export default DepartmentModel;
