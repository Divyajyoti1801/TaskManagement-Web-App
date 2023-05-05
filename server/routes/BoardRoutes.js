import express from "express";
import {
  createBoard,
  createColumn,
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
router.route("/column/new/:bid").post(AuthCheck, createColumn);

export default router;
