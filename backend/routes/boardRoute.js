import express from "express";
import isAuthenticated from "../middleware/authenticationCheck.js";

//Router Initialization
const router = express.Router();

//Controller Import
import {
  createBoard,
  createTask,
  deleteBoard,
  deleteTask,
  showBoard,
  updateBoard,
  updateTask,
} from "../controller/boardController.js";

//Route Entrypoint
router.route("/board/new").post(isAuthenticated, createBoard);
router.route("/board/update/:id").put(isAuthenticated, updateBoard);
router.route("/board/all").get(isAuthenticated, showBoard);
router.route("/board/delete/:id").delete(isAuthenticated, deleteBoard);
router.route("/task/new/:bid").post(isAuthenticated, createTask);
router.route("/task/delete/:bid/:cid/:tid").delete(isAuthenticated, deleteTask);
router.route("/task/update/:bid/:cid/:tid").put(isAuthenticated, updateTask);
export default router;
