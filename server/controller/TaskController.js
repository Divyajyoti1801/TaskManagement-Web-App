import Boards from "../models/BoardModel.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const createTask = AsyncHandler(async (req, res, next) => {
  const board = await Boards.findById(req.params.bid);
  const { title, description, status, subtasks } = req.body;
  if (!board) {
    return next(new ErrorHandler("Board Not Found", 404));
  }
  const [column] = board.columns.filter((col) => col.name === status);
  if (!column) {
    return next(new ErrorHandler("Column Not Found", 404));
  }
  column.tasks.push({ title, description, status, subtasks });
  await board.save();
  res.status(200).json({ message: "Task Created Successfully" });
});

export const subtaskUpdation = AsyncHandler(async (req, res, next) => {});
