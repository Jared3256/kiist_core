import mongoose from "mongoose";

const netVendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
  },
  subscriptions: [
    {
      subscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NetVendorSubscription",
      },
      amount: {
        type: Number,
        required: true,
        default: 0,
      },
      plan: {
        type: String,
        required: true,
        enum: ["hourly", "daily", "weekly", "monthly"],
        default: "hourly",
      },
    },
  ],

  router: [
    {
      routerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NetRouter",
      },
      macAddress: {
        type: String,
      },
      gatewayDNS: {
        type: String,
        required: true,
      },
      user: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
    },
  ],
  totalRevenue: {
    type: Number,
    default: 0,
  },
  billingHistory: [
    {
      billingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NetBilling",
      },
      sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NetSession",
      },
      amountBilled: {
        type: Number,
        default: 0,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  discounts: [
    {
      code: {
        type: String,
      },
      type: {
        type: String,
        enum: ["percentage", "fixed"],
        default: "percentage",
      },
      value: {
        type: Number,
        default: 10,
      },
      validUntil: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export const NetVendor = mongoose.model("NetVendor", netVendorSchema);
