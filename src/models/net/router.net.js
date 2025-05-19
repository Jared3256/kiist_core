import mongoose from"mongoose";

const netRouterSchema = new mongoose.Schema(
  {
    macAddress: {
      type: String,
      required: true,
      unique: true,
    },
    gatewayDNS: {
      type: String,
      required: true,
      unique: true,
    },
    rootUsername: {
      type: String,
      required: true,
    },
    rootPassword: {
      type: String,
      required: true,
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NetVendor",
      required: true,
    },
    location: {
      type: String,
      default: "premises",
    },
    sessions: [
      {
        sessionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "NetSession",
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
    totalDataUsed: {
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
    timestamps: true,
  }
);

export const NetRouter = mongoose.model("NetRouter", netRouterSchema);

