import { Link } from "react-router-dom";
import Logo from "../../assets/logo-light.svg";
import "./Welcome.scss";

const Welcome = () => {
  return (
    <div className="welcome">
      <div className="welcome__header">
        <h1 className="welcome__header--text">Task Management &nbsp; App</h1>
        <img src={Logo} className="welcome__header--logo" alt="Logo" />
      </div>
      <div className="welcome__cta">
        <Link className="welcome__cta--Login" to="/login">
          Login
        </Link>
        <Link className="welcome__cta--Register" to="/register">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
