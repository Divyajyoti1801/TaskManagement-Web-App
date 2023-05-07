import express from "express";
import { createTask, subtaskUpdation } from "../controller/TaskController.js";
import AuthCheck from "../middlewares/AuthCheck.js";

const router = express.Router();

router.route("/task/new/:bid").post(AuthCheck, createTask);
router.route("/task/subtasks/:bid/:cid/:tid").put(AuthCheck, subtaskUpdation);

export default router;
