import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../store/User/user.actions";

import { selectIsAuthenticated } from "../../store/User/user.selector";
import "./LoginPage.scss";

//Default Form Field
const defaultFormInput = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState(defaultFormInput);
  const { email, password } = formInput;
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  //Input Value Change Handler
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    return setFormInput({ ...formInput, [name]: value });
  };

  //Clear Form Inputs
  const clearFormInput = () => setFormInput(defaultFormInput);

  //Submit Form Handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(LoginUser(email, password));
    clearFormInput();
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="authlogin">
      <form className="login" onSubmit={onSubmitHandler}>
        <h1 className="login__header">Login</h1>
        <div className="login__container">
          <label className="login__container--label">Email</label>
          <input
            type="email"
            className="login__container--input"
            name="email"
            placeholder="Please enter email..."
            value={email}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="login__container">
          <label className="login__container--label">Password</label>
          <input
            type="password"
            className="login__container--input"
            name="password"
            placeholder="Please enter password..."
            value={password}
            onChange={onChangeHandler}
            required
          />
        </div>
        <button className="login__submit" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
