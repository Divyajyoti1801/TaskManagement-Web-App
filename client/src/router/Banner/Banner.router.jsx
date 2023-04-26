import React from "react";
import { useNavigate } from "react-router-dom";
import "./Banner.styles.scss";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="banner">
      <div className="banner__header">
        <h1 className="banner__header--logo">Taskmanagement App</h1>
      </div>
      <div className="banner__cta">
        <button className="banner__cta--1" onClick={() => navigate("/login")}>
          Login
        </button>
        <button
          className="banner__cta--2"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Banner;
