import mongoose from "mongoose";

const netBillingSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NetVendor",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NetUser",
      required: true,
    },
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NetSession",
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    paymentStatus: {
      type: String,
      enum: ["initiated", "pending", "completed", "refunded"],
      default: "completed",
    },
  },
  {
    timestamps: true,
  }
);

const NetBilling = mongoose.model("NetBilling", netBillingSchema);

export NetBilling;
