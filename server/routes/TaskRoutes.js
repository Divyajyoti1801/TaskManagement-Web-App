import express from "express";
import { createTask } from "../controller/TaskController.js";
import AuthCheck from "../middlewares/AuthCheck.js";

const router = express.Router();

router.route("/task/new/:bid").post(AuthCheck, createTask);

export default router;
