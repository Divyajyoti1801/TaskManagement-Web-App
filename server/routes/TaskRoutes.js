import express from "express";
import {
  createTask,
  deleteTask,
  subtaskUpdation,
} from "../controller/TaskController.js";
import AuthCheck from "../middlewares/AuthCheck.js";

const router = express.Router();

router.route("/task/new/:bid").post(AuthCheck, createTask);
router.route("/task/subtasks/:bid/:cid/:tid").put(AuthCheck, subtaskUpdation);
router.route("/task/delete/:bid/:cid/:tid").delete(AuthCheck, deleteTask);

export default router;
