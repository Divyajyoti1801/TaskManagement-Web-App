import asyncErrorHandler from "../middleware/asyncErrorHandler.js";
import sendToken from "../middleware/createToken.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import Users from "../models/userModel.js";

//New User Creation
export const userCreation = asyncErrorHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ErrorHandler("All fields are mandatory", 203));
  }
  const user = await Users.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is Sample Data",
      url: "this is Sample Data",
    },
  });
  sendToken(user, 201, res);
});

//User Sign-In
export const userLogin = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("All fields are mandatory", 203));
  }
  const user = await Users.findOne({
    email: email,
  }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Please Register First", 404));
  }
  const isPassword = user.comparePassword(password);
  if (!isPassword) {
    return next(
      new ErrorHandler("Please Enter Correct Email and Password", 401)
    );
  }
  sendToken(user, 200, res);
});

//User Sign-Out
export const userLogout = asyncErrorHandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "User Logout Successful",
  });
});

//User Details
export const userDetails = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user._id;
  const user = await Users.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//User Details Update
export const userUpdate = asyncErrorHandler(async (req, res, next) => {
  const updateData = {
    name: req.body.name,
    email: req.body.email,
  };
  await Users.findByIdAndUpdate(req.user._id, updateData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "User Data Updated Successfully",
  });
});

//User Password Reset
export const resetPassword = asyncErrorHandler(async (req, res, next) => {
  const user = await Users.findById(req.user._id).select("+password");
  if (!user) {
    return next(new ErrorHandler("User Not Found", 400));
  }
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password Is Incorrect", 406));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password Doesn't Match", 406));
  }
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
});
