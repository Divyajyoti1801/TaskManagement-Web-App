import React from "react";
import { Route, Routes } from "react-router-dom";
import Banner from "./router/Banner/Banner.router";
import Login from "./router/Login/Login.router";
import Register from "./router/Register/Register.router";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Banner />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
