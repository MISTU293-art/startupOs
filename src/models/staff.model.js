import mongoose from "mongoose";

const staffRegisterSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      enum: ["admin", "hr", "employee", "accounnts", "it"],
      required: true,
    },

    employeeId: {
      type: String,
      required: true,
      unique: true,
    },

    qualification: {
      type: String,
      required: true,
    },

    salary: {
      type: Number,
      required: true,
    },

    aadhaarCard: {
      type: String,
      required: true,
      trim: true,
    },

    panCard: {
      type: String,
      uppercase: true,
      trim: true,
    },

    accountNo: {
      type: String,
      required: true,
    },

    ifscCode: {
      type: String,
      required: true,
      uppercase: true,
    },

    branchCode: {
      type: String,
      required: true,
    },

    hiredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "accessModel",
      required: true,
    },
    status:{
      type:String,
      enum:["active","blocked"],
      default:"active"
    }
  },
  {
    timestamps: true,
  },
);

const StaffModel = mongoose.model("Staff", staffRegisterSchema);

export default StaffModel;
