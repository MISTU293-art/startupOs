import StaffModel from "../models/staff.model.js";

async function registerStaff(req, res) {
  try {
    const {
      fullName,
      address,
      department,
      employeeId,
      qualification,
      salary,
      aadhaarCard,
      panCard,
      accountNo,
      ifscCode,
      branchCode,
    } = req.body;
    const isUserDetailsExists = await StaffModel.findOne({
      $or: [{ accountNo }, { aadhaarCard }, { panCard }],
    });
    if (isUserDetailsExists) {
      return res.status(409).json({
        message: "User Already Exists",
      });
    }
    const NewemployeeId = `EMP-${department.toUpperCase()}-${Date.now().toString().slice(-6)}`;
    const employee = await StaffModel.create({
      fullName,
      address,
      department,
      employeeId: NewemployeeId,
      qualification,
      salary,
      aadhaarCard,
      panCard,
      accountNo,
      ifscCode,
      hiredBy: req.user._id,
      branchCode,
    });
    console.log(employee);
    return res.status(201).json({
      message: "Staff Registered",
      employee,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
async function staffDetails(req, res) {
  try {
    const employee = await StaffModel.find().populate(
      "hiredBy",
      "username fullName",
    );
    return res.status(200).json({
      message: "All Staffs Fetched SuccessFully",
      totalEmployee:employee.length,
      employee,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function updateStaff(req, res) {
  try {
    const _id = req.params._id;
    const { status, address, qualification, salary } = req.body;

    const user = await StaffModel.findOne({ _id });
    console.log(user);
    if (!user) {
      return res.status(404).json({
        message: "Staff Not Found",
      });
    }

    const updatedData = await StaffModel.findByIdAndUpdate(
      _id,
      {
        status,
        address,
        qualification,
        salary,
      },
      {
        new: true,
      },
    );

    return res.status(200).json({
      message: "Staff Details Updated",
      updatedData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}


export { registerStaff, staffDetails, updateStaff };
