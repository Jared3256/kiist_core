import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    vendorSubscription: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["one-time", "pre-paid"],
      default: "one-time",
    },
    startTime: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    subscriptionCode: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "suspended","expired"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export const NetSubscription = mongoose.model(
  "NetSubscription",
  subscriptionSchema
);
