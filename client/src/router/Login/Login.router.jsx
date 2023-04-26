import React, { useState } from "react";
import "./Login.styles.scss";

const defaultState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formInput, setFormInput] = useState(defaultState);
  const { email, password } = formInput;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    return setFormInput({ ...formInput, [name]: value });
  };
  return (
    <div className="login">
      <form className="signin">
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
