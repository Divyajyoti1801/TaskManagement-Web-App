import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo-light.svg";
import "./HomePage.scss";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="home__header">
        <h1 className="home__header--text">Task Management</h1>
        <img src={Logo} alt="Logo" className="home__header--logo" />
      </div>
      <div className="home__cta">
        <button className="home__cta--login" onClick={() => navigate("/login")}>
          Login
        </button>
        <button
          className="home__cta--register"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default HomePage;
