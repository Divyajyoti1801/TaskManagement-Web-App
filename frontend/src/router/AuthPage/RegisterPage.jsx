import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const clearFormInput = () => setFormInput(defaultFormInput);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    return setFormInput({ ...formInput, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/user/register", {
        name,
        email,
        password,
        confirmPassword,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        clearFormInput();
        toast.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(`ERROR IN REGISTER ROUTER`);
    }
  };

  return (
    <div className="authregister">
      <form className="register" onSubmit={onSubmitHandler}>
        <h1 className="register__header">Register</h1>
        <div className="register__container">
          <label className="register__container--label">Name</label>
          <input
            type="text"
            className="register__container--input"
            name="name"
            placeholder="Please enter name..."
            value={name}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="register__container">
          <label className="register__container--label">Email</label>
          <input
            type="email"
            className="register__container--input"
            name="email"
            placeholder="Please enter email..."
            value={email}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="register__container">
          <label className="register__container--label">Password</label>
          <input
            type="password"
            className="register__container--input"
            name="password"
            placeholder="Please enter password..."
            value={password}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="register__container">
          <label className="register__container--label">Confirm Password</label>
          <input
            type="password"
            className="register__container--input"
            name="confirmPassword"
            placeholder="Please enter confirm password..."
            value={confirmPassword}
            onChange={onChangeHandler}
            required
          />
        </div>
        <button className="register__submit" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
