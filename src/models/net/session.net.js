import mongoose from "mongoose";

const netSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NetUser",
      required: true,
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NetVendor",
      required: true,
    },
    routerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NetRouter",
      required: true,
    },
    startTime: {
      type: Date,
      default: Date.now,
    },
    endTime: Date,
    dataUsed: {
      type: Number,
      default: 0,
    },
    amountBilled: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

export const NetSession = mongoose.model("NetSession", netSessionSchema);
