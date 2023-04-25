import ErrorHandler from "../middleware/ErrorMiddleware.js";
import Boards from "../models/BoardModel.js";
import AsyncHandler from "../utils/AsyncFunction.js";

//Create Task
export const createTask = AsyncHandler(async (req, res, next) => {
  const { tName, description, status, subtasks } = req.body;
  const board = await Boards.findById(req.params.bid);
  if (!board) {
    return next(new ErrorHandler("Board Not Found", 404));
  }
  const [column] = board.columns.filter((col) => col.cName === status);
  if (!column) {
    return next(new ErrorHandler("Column Not Found", 404));
  }
  column.tasks.push({
    tName,
    description,
    subtasks,
    status,
    column: column._id,
    board: board._id,
  });
  await board.save();
  res.status(201).json(column.tasks);
});

//Show and Update Particular Task
export const showTask = AsyncHandler(async (req, res, next) => {
  const { subtasks } = req.body;
  const board = await Boards.findById(req.params.bid);
  if (!board) {
    return next(new ErrorHandler("Board Not Found", 404));
  }
  const [column] = board.columns.filter(
    (col) => col._id.toString() === req.params.cid
  );
  if (!column) {
    return next(new ErrorHandler("Column Not Found", 404));
  }
  const [task] = column.tasks.filter(
    (t) => t._id.toString() === req.params.tid
  );
  if (!task) {
    return next(new ErrorHandler("Task Not Found", 404));
  }
  task.subtasks.map((s) => {
    return subtasks.map((sub) => {
      if (sub.sName === s.sName) {
        s.isCompleted = sub.isCompleted;
      }
    });
  });
  await board.save();
  res.status(200).json(task);
});

//Edit the specific task
export const editTask = AsyncHandler(async (req, res, next) => {
  const { tName, description, status, subtasks } = req.body;

  const board = await Boards.findById(req.params.bid);
  if (!board) {
    return next(new ErrorHandler("Board Not Found", 404));
  }
  const [column] = board.columns.filter(
    (col) => col._id.toString() === req.params.cid
  );
  if (!column) {
    return next(new ErrorHandler("Column Not Found", 404));
  }

  let [task] = column.tasks.filter((t) => t._id.toString() === req.params.tid);

  if (!task) {
    return next(new ErrorHandler("Task Not Found", 404));
  }
  //If there is Change in Status
  if (status !== task.status) {
    const [cColumn] = board.columns.filter((col) => col.cName === status);
    if (!cColumn) {
      return next(new ErrorHandler("Column Not Found", 404));
    }
    cColumn.tasks.push({
      tName,
      description,
      status,
      subtasks: [...subtasks],
      column: cColumn._id,
    });
    column.tasks = column.tasks.filter(
      (t) => t._id.toString() !== req.params.tid
    );
  } else {
    task = {
      tName,
      description,
      status,
      subtasks: [...subtasks],
    };
  }
  await board.save();
  res.status(200).json({
    success: true,
    message: "Task Edit Successful",
  });
});

//Delete Tasks
export const deleteTask = AsyncHandler(async (req, res, next) => {
  const board = await Boards.findById(req.params.bid);
  if (!board) {
    return next(new ErrorHandler("Board Not Found", 404));
  }
  const [column] = board.columns.filter(
    (col) => col._id.toString() === req.params.cid
  );
  if (!column) {
    return next(new ErrorHandler("Column Not Found", 404));
  }
  let [task] = column.tasks.filter((t) => t._id.toString() === req.params.tid);
  if (!task) {
    return next(new ErrorHandler("Task Not Found", 404));
  }
  column.tasks = column.tasks.filter(
    (t) => t._id.toString() !== req.params.tid
  );
  await board.save();
  res.status(200).json({
    success: true,
    message: `Task (${task.tName}) deleted successfully`,
  });
});
