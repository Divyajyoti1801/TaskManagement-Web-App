import express from "express";
import {
  createBoard,
  deleteBoard,
  getBoard,
  showBoards,
} from "../controller/BoardController.js";
import AuthCheck from "../middlewares/AuthCheck.js";
const router = express.Router();

router.route("/board/all").get(AuthCheck, showBoards);
router.route("/board/:id").get(AuthCheck, getBoard);
router.route("/board/new").post(AuthCheck, createBoard);
router.route("/board/delete/:id").delete(AuthCheck, deleteBoard);

export default router;
