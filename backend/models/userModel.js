import bcrypt from "bcrypt";
import { createHash, randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Enter the Name"],
      maxLength: [30, "No Cannot be more than 30 characters"],
      minLength: [4, "Name must be more than 4 character"],
    },
    email: {
      type: String,
      require: [true, "Enter the Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter The Valid Email"],
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password length must 8 or more"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

//Encryption of Password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//Token Creation for Session Management
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
    expiresIn: process.env.TOKEN_EXPIRE,
  });
};

//Checking Password When Sign-in
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Reset Password Token Generator
userSchema.methods.resetToken = function () {
  const resetToken = randomBytes(20).toString("hex");
  this.resetPasswordToken = createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

//User Model Creation in Database
const Users = mongoose.model("Users", userSchema);

export default Users;
