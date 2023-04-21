import express from "express";
import isAuthenticated from "../middleware/authenticationCheck.js";

//Router Initialization
const router = express.Router();

//Controller Import
import { createBoard, showBoard } from "../controller/boardController.js";

//Route Entrypoint
router.route("/board/new").post(isAuthenticated, createBoard);
router.route("/board/all").get(isAuthenticated, showBoard);

export default router;
