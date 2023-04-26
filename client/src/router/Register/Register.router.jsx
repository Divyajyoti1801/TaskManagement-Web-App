import React, { useState } from "react";
import "./Register.styles.scss";

const defaultInput = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [formInput, setFormInput] = useState(defaultInput);
  const { userName, email, password, confirmPassword } = formInput;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    return setFormInput({ ...formInput, [name]: value });
  };

  return (
    <div className="register">
      <form className="signup">
        <h1 className="signup__header">Register</h1>
        <div className="signup__component">
          <label className="signup__component--label">User Name</label>
          <input
            type="text"
            name="userName"
            value={userName}
            onChange={onChangeHandler}
            className="signup__component--input"
            placeholder="Please Enter User Name"
            required
          />
        </div>
        <div className="signup__component">
          <label className="signup__component--label">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChangeHandler}
            className="signup__component--input"
            placeholder="Email"
            required
          />
        </div>
        <div className="signup__component">
          <label className="signup__component--label">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChangeHandler}
            placeholder="Password"
            className="signup__component--input"
            required
          />
        </div>
        <div className="signup__component">
          <label className="signup__component--label">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChangeHandler}
            placeholder="Confirm Password"
            className="signup__component--input"
            required
          />
        </div>
        <button className="signup__submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
