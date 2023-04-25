import express from "express";
import {
  createBoard,
  deleteBoard,
  getBoard,
  getBoards,
} from "../controller/BoardController.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

//Major Endpoints
router.post("/board/new", isAuthenticated, createBoard);
router.delete("/board/delete/:id", isAuthenticated, deleteBoard);
router.get("/board/all", isAuthenticated, getBoards);
router.get("/board/:id", isAuthenticated, getBoard);
export default router;
