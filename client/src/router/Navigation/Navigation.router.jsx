import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LOGO from "../../assets/logo-dark.svg";
import { LogoutUser } from "../../store/User/user.actions";
import {
  selectIsAuthenticated,
  selectUser,
} from "../../store/User/user.selector";
import "./Navigation.styles.scss";

const Navigation = () => {
  const { userName } = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(LogoutUser);
  };
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  });
  return (
    <header className="header">
      <div className="header__logo">
        <img src={LOGO} alt="Kanban Logo" className="header__logo--img" />
      </div>
      <div className="header__nav">
        <h1 className="header__nav--heading">Platform Launch</h1>
        <div className="header__nav--profile">
          <h2 className="header__nav--profile--name">{userName}</h2>
          <button onClick={logoutHandler} className="header__nav--profile--cta">
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
