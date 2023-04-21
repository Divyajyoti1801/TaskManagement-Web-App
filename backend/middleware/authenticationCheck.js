import jwt from "jsonwebtoken";
import Users from "../models/userModel.js";
import asyncErrorHandler from "./asyncErrorHandler.js";
import ErrorHandler from "./errorMiddleware.js";

const isAuthenticated = asyncErrorHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please Login To Access This Resource", 401));
  }
  const decodeData = jwt.verify(token, process.env.SECRET_KEY);
  req.user = await Users.findById(decodeData.id);
  next();
});

export default isAuthenticated;
