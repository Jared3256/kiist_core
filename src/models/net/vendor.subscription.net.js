import mongoose from "mongoose";

const vendorSubscriptionSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    duration: {
      type: Number,
      default: 1,
    },
    plan: {
      type: String,
      required: true,
      enum: ["hourly", "daily", "weekly", "monthly"],
      default: "hourly",
    },
    active: {
      type: Boolean,
      enum: [true, false],
      default: true,
      required: true,
    },
    isDefault: {
      type: Boolean,
      enum: [true, false],
      default: false,
      required: true,
    },
    allowedDevices: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

export const NetVendorSubscription = mongoose.model(
  "NetVendorSubscription",
  vendorSubscriptionSchema
);
