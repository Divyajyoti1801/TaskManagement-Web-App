import express from "express";
const router = express.Router();

//CONTROLLERS IMPORT
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/UserController.js";

//USER ROUTES
router.route("/user/register").post(registerUser);
router.route("/user/login").post(loginUser);
router.route("/user/logout").get(logoutUser);

export default router;
