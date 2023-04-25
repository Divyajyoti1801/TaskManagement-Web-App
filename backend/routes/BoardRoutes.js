import express from "express";
import {
  createBoard,
  createColumn,
  deleteBoard,
  getBoard,
  getBoards,
  showTasks,
} from "../controller/BoardController.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

//Major Endpoints
router.post("/board/new", isAuthenticated, createBoard);
router.delete("/board/delete/:id", isAuthenticated, deleteBoard);
router.get("/board/all", isAuthenticated, getBoards);
router.get("/board/:id", isAuthenticated, getBoard);
router.post("/column/new/:bid", isAuthenticated, createColumn);
router.get("/column/task/:bid/:cid", isAuthenticated, showTasks);

export default router;
