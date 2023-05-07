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

export const subtaskUpdation = AsyncHandler(async (req, res, next) => {
  const { subtasks, status } = req.body;
  const { bid, cid, tid } = req.params;
  const board = await Boards.findById(bid);
  if (!board) {
    return next(new ErrorHandler("Board not found", 404));
  }
  const [column] = board.columns.filter((col) => col._id.toString() === cid);
  if (!column) {
    return next(new ErrorHandler("Column not Found", 404));
  }
  let [task] = column.tasks.filter((task) => task._id.toString() === tid);
  if (!task) {
    return next(new ErrorHandler("Task Not Found", 404));
  }
  if (status === column.name) {
    task = { ...task, status, subtasks: subtasks };
    await board.save();
    res.status(200).json({ message: "Task Updated Successfully" });
  } else {
    const [changeColumn] = board.columns.filter((col) => col.name === status);
    const newTask = { ...task, status: status, subtasks: subtasks };
    column = column.tasks.filter((t) => t._id.toString() !== tid);
    changeColumn.tasks.push(newTask);
    await board.save();
    res.status(201).json({ message: "Task Updated Successfully" });
  }
});
