// import mongoose library package
import mongoose from "mongoose";

const defaultNetUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      default: "Eutron_User",
    },
    accountStatus: {
      type: String,
      enum: ["activated"],
      default: "activated",
    },
    subscriptions: [
      {
        plan: {
          type: String,
          enum: ["hourly", "daily", "weekly", "monthly"],
          default: "hourly",
        },
        allowedDevices: {
          type: Number,
          required: true,
          default: 1,
        },
        status: {
          type: String,
          enum: ["active", "suspended", "expired"],
          default: "active",
        },
        endDate: Date,
        phoneNumber: {
          type: String,
          default: "",
        },
      },
    ],
    sessions: [
      {
        sessionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "NetSession",
        },
        routerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "NetRouter",
        },
        vendorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "NetVendor",
        },
        startTime: {
          type: Date,
          default: Date.now,
        },
        endTime: {
          type: Date,
        },
        dataUsed: {
          type: Number,
          default: 0,
        },
      },
    ],
    paymentHistory: [
      {
        paymentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "NetPayment",
        },
        amount: {
          type: Number,
          default: 0,
        },
        method: {
          type: String,
          enum: ["CreditCard", "PayPal", "BankTransfer", "Mpesa_AirtelMoney"],
          default: "Mpesa_AirtelMoney",
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        vendorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "NetVendor",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const NetDefaultUser = mongoose.model(
  "DefaultUser",
  defaultNetUserSchema
);
