import TaskModel from "../models/task_assign.model.js";

async function EmployeeTask(req, res) {
  try {
    const assignTo = req.user.email;

    const tasks = await TaskModel.find({ assignTo });
    return res.status(200).json({
      message: "Your Tasks Fetched SuccessFully",
      totalTasks: tasks.length,
      tasks,
    });
  } catch (error) {
    console.log(error);
  }
}

export { EmployeeTask };
