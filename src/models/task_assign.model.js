import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    taskTitle: {
      type: String,
      requied: true,
    },
    additionalFile: {
      type: String,
    },
    startDate: {
      type: Date,
      requied: true,
    },
    deadLine: {
      type: Date,
      requied: true,
    },
    assignTo: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
const TaskModel = mongoose.model("tasks", TaskSchema);

export default TaskModel;
