import ErrorHandler from "../middleware/ErrorMiddleware.js";
import Boards from "../models/BoardModel.js";
import Users from "../models/UserModel.js";
import AsyncHandler from "../utils/AsyncFunction.js";

//Create Board
export const createBoard = AsyncHandler(async (req, res, next) => {
  const { bName, columns } = req.body;
  if (!bName) {
    return next(new ErrorHandler("Please enter Board Name", 203));
  }
  const board = await Boards.create({
    bName,
    columns,
    user: req.user._id,
  });
  res.status(201).json(board);
});

//Delete Board
export const deleteBoard = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new ErrorHandler("Please Provide ID", 203));
  }
  const board = await Boards.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: `Board (${board.bName}) is removed successfully`,
  });
});

//Show Board
export const getBoards = AsyncHandler(async (req, res, next) => {
  const boards = await Boards.find({ user: req.user._id });
  if (!boards) {
    return next(new ErrorHandler("No Boards Found", 404));
  }
  res.status(200).json(boards);
});

//Show One Specific Board
export const getBoard = AsyncHandler(async (req, res, next) => {
  const board = await Boards.findOne({
    user: req.user._id,
    _id: req.params.id,
  });
  if (!board) {
    return next(new ErrorHandler("Board Not Found", 404));
  }
  res.status(200).json(board);
});
