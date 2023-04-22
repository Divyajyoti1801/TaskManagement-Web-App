import asyncErrorHandler from "../middleware/asyncErrorHandler.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import Boards from "../models/boardModel.js";

//Create New Board and Update Board
export const createBoard = asyncErrorHandler(async (req, res, next) => {
  const { name, columns } = req.body;
  if (!name) {
    return next(new ErrorHandler("Please enter the title of Board", 400));
  }
  const board = await Boards.create({
    name,
    columns,
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    board,
  });
});

//Update Board
export const updateBoard = asyncErrorHandler(async (req, res, next) => {
  await Boards.findByIdAndUpdate(req.params.id,req.body);
  res.status(200).json({
    success: true,
    message:"Board Updated Successfully",
  })
});

//Delete Board
export const deleteBoard = asyncErrorHandler(async (req, res, next) => {
  const board = await Boards.findById(req.params.id);
  if (!board) {
    return next(new ErrorHandler("Board not found", 404));
  }
  await Boards.findByIdAndRemove(req.params.id);
  res.status(200).json({
    success: true,
    message: `Board Delete Successfully ${board.name}`,
  });
});

//Show Board
export const showBoard = asyncErrorHandler(async (req, res, next) => {
  const boards = await Boards.find({ user: req.user._id });
  if (!boards) {
    return next(new ErrorHandler("No Boar Created Yet", 400));
  }
  res.status(200).json({
    success: true,
    boards,
  });
});

//Create Task
export const createTask = asyncErrorHandler(async (req, res, next) => {
  const { title, description, status, subtasks } = req.body;
  const board = await Boards.findById(req.params.bid);
  if (!board) {
    return next(new ErrorHandler("Board Not Found", 404));
  }
  const [column] = board.columns.filter((col) => col.title === status);
  if (!column) {
    return next(new ErrorHandler("Column Not Found", 404));
  }
  column.task.push({
      title,
      description,
      status,
      subtasks,
      column: column._id,
  });
  await board.save();
  res.status(200).json({
    success: true,
    message: `Task Added to Column: ${column.name} + Present on Board : ${board.name}`,
    column,
  });
});

//Update Task
export const updateTask = asyncErrorHandler(async (req, res, next) => {
  const { bid, cid, tid } = req.params;
  const { title, description, status, subtasks } = req.body;
  const board = await Boards.findById(bid);
  if (!board) {
    return next(new ErrorHandler("Board Not Found", 404));
  }
  
  const column = board.columns.find(col => col._id.toString() === cid);
  if (!column) {
    return next(new ErrorHandler("Column Not Found", 400));
  }
  
  const task = column.task.find(t => t._id.toString() === tid);
  if(!task){
    return next(new ErrorHandler("Task Not Found", 400));
  }

  //Checking For Change in Status
  if (task.status === status) {
     task.title = title;
     task.description = description;
     task.status = status;
     task.subtasks = subtasks;
  } else {
    const changeColumn = board.columns.find(col => col.title === status);
    if (!changeColumn) {
      return next(new ErrorHandler("Column Not Found", 404));
    }
    //Change in Column
    changeColumn.task.push({
      title,description,status,subtasks,column:changeColumn._id
    });

    //Removal from Previous Column
    column.task = column.task.filter((t) => t._id.toString() !== tid);

    //Saving Change In The Board
    await board.save();
  }
  await board.save();
  res.status(200).json({
    success: true,
    message: "Task Updated Successfully"
  });
});

//Delete Task
export const deleteTask = asyncErrorHandler(async (req, res, next) => {
  const { bid, tid, cid } = req.params;
  const board = await Boards.findById(bid);
  if (!board) {
    return next(new ErrorHandler("Board Not Found", 404));
  }
  const [column] = board.columns.filter((col) => col._id.toString() === cid);
  if (!column) {
    return next(new ErrorHandler("Column Not Found", 404));
  }
  column.task = column.task.filter((t) => t._id.toString() !== tid);
  await board.save();
  res.status(200).json({
    success: true,
    task: column.task,
  });
});

