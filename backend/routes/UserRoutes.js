import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/UserController.js";
import { isAuthenticated } from "../middleware/auth.js";

//Initialize Router Instance
const router = express.Router();

//Major User End-Points
router.route("/user/register").post(registerUser);
router.post("/user/login", loginUser);
router.get("/user/logout", isAuthenticated, logoutUser);




export default router;