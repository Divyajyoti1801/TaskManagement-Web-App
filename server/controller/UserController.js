import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/UserModel.js";
import AsyncHandler from "../utils/AsyncHandler.js";

/* REGISTER USER CONTROLLER */
export const registerUser = AsyncHandler(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  if (!name) {
    return res.json({ error: "Name Required" });
  }
  if (!password || password.length < 8) {
    return res.json({ error: "Password Required, More Than 8 Characters" });
  }
  if (password !== confirmPassword) {
    return res.json({ error: "Password & Confirm Password Not Matching" });
  }
  if (!email) {
    return res.json({ error: "Email Required" });
  }
  const isUserPresent = await Users.findOne({ email: email });
  if (isUserPresent) {
    return res.json({ error: "User Already Exists" });
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
  const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY);
  res
    .status(200)
    .cookie("token", token, {
      expire: new Date(Date.now()) + process.env.TOKEN_EXPIRY * 24 * 60 * 1000,
      httpOnly: true,
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
