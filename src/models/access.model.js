import mongoose from "mongoose";

const accessSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "hr", "employee", "accounnts", "it"],
      required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now(),
    },
    refreshToken: {
      type: String,
    },
    accessToken:{
      type:String
    },
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);
const accessModel = mongoose.model("accessModel", accessSchema);
export default accessModel;
