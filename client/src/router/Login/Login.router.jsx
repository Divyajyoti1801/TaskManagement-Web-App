import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../store/User/user.actions";
import { selectIsAuthenticated } from "../../store/User/user.selector";
import "./Login.styles.scss";

const defaultState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formInput, setFormInput] = useState(defaultState);
  const { email, password } = formInput;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    return setFormInput({ ...formInput, [name]: value });
  };
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const resetFormFields = () => setFormInput(defaultState);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(LoginUser(email, password));
    resetFormFields();
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="login">
      <form className="signin" onSubmit={onSubmitHandler}>
        <h1 className="signin__header">Login</h1>
        <div className="signin__component">
          <label className="signin__component--label">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChangeHandler}
            placeholder="abc@xyz.com"
            className="signin__component--input"
            required
          />
        </div>
        <div className="signin__component">
          <label className="signin__component--label">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChangeHandler}
            placeholder="password"
            className="signin__component--input"
            required
          />
        </div>
        <button type="submit" className="signin__submit">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
