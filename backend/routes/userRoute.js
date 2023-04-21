import express from "express";

//Controller Import
import {
  resetPassword,
  userCreation,
  userDetails,
  userLogin,
  userLogout,
  userUpdate,
} from "../controller/userController.js";
//Middleware Import
import isAuthenticated from "../middleware/authenticationCheck.js";

//Router Initialization
const router = express.Router();

//All Important Routes
router.route("/user/new").post(userCreation);
router.route("/user/login").post(userLogin);
router.route("/user/logout").get(userLogout);
router
  .route("/user/profile")
  .get(isAuthenticated, userDetails)
  .put(isAuthenticated, userUpdate);
router.route("/user/password/reset").put(isAuthenticated, resetPassword);

export default router;
