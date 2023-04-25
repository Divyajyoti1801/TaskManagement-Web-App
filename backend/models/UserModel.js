import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      max: 10,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validator: [validator.isEmail, "Please Enter Valid Email"],
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("Users", userSchema);
export default Users;
