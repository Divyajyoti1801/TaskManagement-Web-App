import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../../store/User/user.actions";
import {
  selectIsAuthenticated,
  selectUser,
} from "../../../store/User/user.selector";
import "./LoginPage.scss";

const defaultFormInput = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [formInput, setFormInput] = useState(defaultFormInput);
  const { email, password } = formInput;
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //CLEAR INPUT AFTER SUBMISSION
  const clearInputs = () => setFormInput(defaultFormInput);

  //FORM INPUT CHANGE HANDLER
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    return setFormInput({ ...formInput, [name]: value });
  };

  //FORM SUBMIT HANDLER
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(LoginUser(email, password));
    clearInputs();
  };

  //NAVIGATION
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
      toast.success(`Welcome ${user?.name}! Happy Productivity`);
    }
  }, [isAuthenticated, navigate, user]);

  return (
    <div className="LoginForm">
      <form className="login" onSubmit={onSubmitHandler}>
        <h1 className="login__header">Login</h1>
        <div className="login__container">
          <label className="login__container--label">Email</label>
          <input
            type="email"
            className="login__container--input"
            name="email"
            value={email}
            onChange={onChangeHandler}
            placeholder="Please enter email..."
            required
          />
        </div>
        <div className="login__container">
          <label className="login__container--label">Password</label>
          <input
            type="Password"
            className="login__container--input"
            name="password"
            value={password}
            onChange={onChangeHandler}
            placeholder="Please enter password..."
            required
          />
        </div>
        <button type="submit" className="login__btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
