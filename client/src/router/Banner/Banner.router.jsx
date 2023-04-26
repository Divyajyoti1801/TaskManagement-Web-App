import React from "react";
import LOGO from "../../assets/logo-light.svg";
import "./Banner.styles.scss";

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner__header">
        <h1 className="banner__header--logo">Taskmanagement App</h1>
        <img src={LOGO} className="banner__header--img" alt="Kanban Logo" />
      </div>
      <div className="banner__cta"></div>
    </div>
  );
};

export default Banner;
