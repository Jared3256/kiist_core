import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    code: {
      required: true,
      trim: true,
      unique: true,
      type: String,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    creditHours: {
      type: Number,
      required: true,
      min: [1, "Course should have more than 0 hours"],
      max: [5, "Course cannot have more than 5 credit hours"],
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "department",
      required: true,
      trim: true,
    },
    lecturer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    prerequisites: [
      {
        types: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const CourseModel = mongoose.model("course", CourseSchema);
export default CourseModel;
