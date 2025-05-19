import mongoose from "mongoose";

const netUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  macAddresses: {
    type: [String],
    default: [],
  },
  creditStatus: {
    type: Number,
    default: 0,
   required:true
  },
  accountStatus: {
    type: String,
    enum: ["activated", "inactive", "suspended"],
    default: "inactive",
  },
  roles: {
    type: String,
    required: true,
    enum: ["owner", "admin", "vendor", "user"],
    default: "user",
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
});

export const NetUser = mongoose.model("NetUser", netUserSchema);
