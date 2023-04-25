import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorHandler from "../middleware/ErrorMiddleware.js";
import Users from "../models/UserModel.js";
import AsyncHandler from "../utils/AsyncFunction.js";

/* REGISTER USER */
export const registerUser = AsyncHandler(async (req, res, next) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    return next(new ErrorHandler("All Fields Required", 203));
  }
  //Password Encryption
  const salt = await bcrypt.genSalt();
  const passwordHashed = await bcrypt.hash(password, salt);

  //New User Creation
  const user = await Users.create({
    userName,
    email,
    password: passwordHashed,
  });
  res.status(201).json(user);
});

/* LOGIN USER */
export const loginUser = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("All fields are mandatory", 203));
  }
  const user = await Users.findOne({ email: email });
  if (!user) {
    return next(new ErrorHandler("User doesn't exists", 400));
  }
  //Password Checking
  const isMatched = bcrypt.compare(password, user.password);
  if (!isMatched) {
    return next(new ErrorHandler("Invalid Credentials", 401));
  }
  //Session Token Creation
  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
  //Delete Password in order to hide the password in payload
  delete user.password;

  //Cookie Configuration
  const options = {
    expire: new Date(Date.now() + process.env.TOKEN_EXPIRY * 24 * 60 * 1000),
    httpOnly: true,
  };
  //Sending Cookie to manage the session
  res.status(200).cookie("token", token, options).json({ token, user });
});

/* LOGOUT USER */
export const logoutUser = AsyncHandler(async (req, res, next) => {
  const { userName } = req.user;
  if (!userName) {
    return next(new ErrorHandler("Access Denied", 403));
  }
  res.cookie("token", null, {
    expire: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    message: `User ${userName} is logged Out Successfully`,
  });
});
