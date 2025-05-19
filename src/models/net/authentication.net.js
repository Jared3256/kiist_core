// import mongoose library
import mongoose from "mongoose";

const authenticationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    accessToken: {
      type: String,
      unique: true,
      required: true,
    },
    refreshToken: {
      type: String,
      unique: true,
      required: true,
    },
    lastLogin: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

export const NetAuthentication = mongoose.model(
  "NetAuthentication",
  authenticationSchema
);
