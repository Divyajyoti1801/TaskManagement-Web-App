import express from "express";
import {
  createTask,
  deleteTask,
  editTask,
  showTask,
} from "../controller/TaskController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/task/new/:bid", isAuthenticated, createTask);
router.patch("/task/:bid/:cid/:tid", isAuthenticated, showTask);
router.put("/task/:bid/:cid/:tid", isAuthenticated, editTask);
router.delete("/task/:bid/:cid/:tid", isAuthenticated, deleteTask);

export default router;
