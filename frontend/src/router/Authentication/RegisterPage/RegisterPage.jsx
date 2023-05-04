import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../store/User/user.actions";
import {
  selectIsRegistered,
  selectRegisterMessage,
} from "../../../store/User/user.selector";
import "./RegisterPage.scss";

const defaultFormInput = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterPage = () => {
  const [formInput, setFormInput] = useState(defaultFormInput);
  const { name, email, password, confirmPassword } = formInput;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isRegistered = useSelector(selectIsRegistered);
  const registerMessage = useSelector(selectRegisterMessage);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    return setFormInput({ ...formInput, [name]: value });
  };

  const clearFormInput = () => setFormInput(defaultFormInput);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(name, email, password, confirmPassword));
    clearFormInput();
  };

  useEffect(() => {
    if (isRegistered) {
      toast.success("User Register Successful!");
      navigate("/login");
    }
  }, [isRegistered, navigate, registerMessage]);

  return (
    <div className="registerPage">
      <form className="register" onSubmit={onSubmitHandler}>
        <h1 className="register__header">Register</h1>
        <div className="register__container">
          <label className="register__container--label">Username</label>
          <input
            type="text"
            className="register__container--input"
            required
            name="name"
            value={name}
            onChange={onChangeHandler}
            placeholder="Please enter username..."
          />
        </div>
        <div className="register__container">
          <label className="register__container--label">Email</label>
          <input
            type="email"
            className="register__container--input"
            required
            name="email"
            value={email}
            onChange={onChangeHandler}
            placeholder="Please enter email...."
          />
        </div>
        <div className="register__container">
          <label className="register__container--label">Password</label>
          <input
            type="password"
            className="register__container--input"
            required
            name="password"
            value={password}
            onChange={onChangeHandler}
            placeholder="Please enter password..."
          />
        </div>
        <div className="register__container">
          <label className="register__container--label">Confirm Password</label>
          <input
            type="password"
            className="register__container--input"
            required
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChangeHandler}
            placeholder="Please enter confirm password..."
          />
        </div>
        <button type="submit" className="register__btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
