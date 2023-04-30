import express from "express";
import { showBoards } from "../controller/BoardController.js";
import AuthCheck from "../middlewares/AuthCheck.js";
const router = express.Router();

router.route("/board").get(AuthCheck, showBoards);

export default router;
