import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/UserModel.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";

/* REGISTER USER CONTROLLER */
export const registerUser = AsyncHandler(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  if (!name) {
    return next(new ErrorHandler("Name Required", 204));
  }
  if (!password || password.length < 8) {
    return next(
      new ErrorHandler(
        "Password Required! Password Length More Than 8 Characters",
        204
      )
    );
  }
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password & Confirm Password Not Matching", 204)
    );
  }
  if (!email) {
    return res.json({ error: "Email Required" });
  }
  const isUserPresent = await Users.findOne({ email: email });
  if (isUserPresent) {
    return next(new ErrorHandler("User Already Exists", 404));
  }

  //Password Encryption
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await Users.create({ name, email, password: hashedPassword });
  res
    .status(201)
    .json({ message: "User Created Successfully! Please Login", user });
});

/* LOGIN USER CONTROLLER */
export const loginUser = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res.json({ error: "Email Required" });
  }
  if (!password) {
    return res.json({ error: "Password Required" });
  }
  const user = await Users.findOne({ email: email });
  if (!user) {
    res.json({ error: "User Doesn't Exists! Please Register" });
  }
  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword) {
    return res.json({ error: "Invalid Credentials" });
  }
  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })
    .json({ message: `Welcome ${user.name}. Happy Productivity`, user });
});

/* USER LOGOUT CONTROLLER */
export const logoutUser = AsyncHandler(async (req, res, next) => {
  return res
    .status(200)
    .cookie("token", null, { expire: new Date(Date.now()), httpOnly: true })
    .json({ message: "User Logout Successfully" });
});
