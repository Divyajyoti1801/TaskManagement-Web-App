import jwt from "jsonwebtoken";
import Users from "../models/UserModel.js";
import ErrorHandler from "./ErrorMiddleware.js";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Access Denied", 403));
  }
  const decodedData = jwt.verify(token, process.env.SECRET_KEY);
  req.user = await Users.findById(decodedData.id);
  next();
};
