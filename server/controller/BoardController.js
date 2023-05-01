import Boards from "../models/BoardModel.js";
import Users from "../models/UserModel.js";
import AsyncHandler from "../utils/AsyncHandler.js";

/* SHOW ALL BOARD CONTROLLER */
export const showBoards = AsyncHandler(async (req, res, next) => {
  const id = req.user;
  const user = await Users.findById(id);
  if (!user) {
    return res.json({ error: "User Not Found" });
  }
  const boards = await Boards.find({ user: user._id });
  if (!boards) {
    return res.json({ message: "Board Not Found! Create Boards" });
  }
  res.status(200).json(boards);
});

/* CREATE BOARD CONTROLLER */
export const createBoard = AsyncHandler(async (req, res, next) => {
  const { name, columns } = req.body;
  const id = req.user;
  const user = await Users.findById(id);
  if (!user) {
    return res.status(404).json({ error: "User Not Found" });
  }
  const checkBoard = await Boards.find({ name: name });
  if (checkBoard) {
    return res.json({ error: "Board Already Exists" });
  }
  const board = await Boards.create({ name, user: user._id, Columns: columns });
  res
    .status(201)
    .json({ message: `Board (${board.name}) Created Successfully` });
});

/* DELETE BOARD CONTROLLER */
export const deleteBoard = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const board = await Boards.findById(id);
  if (!board) {
    return res.status(404).json({ error: "Board Not Found" });
  }
  await Boards.findByIdAndDelete(id);
  res.json({ message: "Board Removed Successfully" });
});