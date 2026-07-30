import StaffModel from "../models/staff.model.js";
import TaskModel from "../models/task_assign.model.js";
import { uploadFile } from "../services/stroage.service.js";
async function AllStaffsDetails(req, res) {
  try {
    const _id = req.user._id;
    console.log("Logged-in User ID:", req.user._id);
    const employee = await StaffModel.find({
      hiredBy: req.user._id,
    }).populate("hiredBy", "fullName username");
    console.log(employee);
    return res.status(200).json({
      message: "Employee Data Fetched",
      totalStaff: employee.length,
      employee,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function assignTask(req, res) {
  try {
    const { taskTitle, startDate, deadLine, assignTo, description } = req.body;
    const additionalFile = req.file;
    console.log(req.file);
    console.log(req.file.size);

    const result = await uploadFile(req.file.buffer.toString("base64"));
    console.log(result);
    const TaskUpload = await TaskModel.create({
      taskTitle,
      startDate,
      deadLine,
      description,
      assignTo,
      additionalFile: result.url,
    });
    return res.status(201).json({
      message: "task created",
      TaskUpload,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
}

export { AllStaffsDetails, assignTask };
