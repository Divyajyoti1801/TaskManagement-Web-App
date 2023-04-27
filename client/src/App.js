import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import { useSelector } from "react-redux";
import Banner from "./router/Banner/Banner.router";
import Board from "./router/Board/Board.router";
import Login from "./router/Login/Login.router";
import Navigation from "./router/Navigation/Navigation.router";
import Register from "./router/Register/Register.router";
import { selectIsAuthenticated } from "./store/User/user.selector";

const App = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <Routes>
      <Route path="/" element={<Banner />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/home"
        element={isAuthenticated ? <Navigation /> : <Navigate to="/" />}
      >
        <Route index element={<Board />} />
      </Route>
    </Routes>
  );
};

export default App;
