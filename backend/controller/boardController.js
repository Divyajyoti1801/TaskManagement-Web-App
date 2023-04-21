import asyncErrorHandler from "../middleware/asyncErrorHandler.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import Boards from "../models/boardModel.js";

//Create New Board
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

//Delete Board

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

//Create  Column

//Create Task

//Delete Task
