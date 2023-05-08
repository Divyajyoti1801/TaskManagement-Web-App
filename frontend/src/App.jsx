import axios from "axios";
import React, { Fragment } from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./router/Authentication/LoginPage/LoginPage";
import RegisterPage from "./router/Authentication/RegisterPage/RegisterPage";
import DashBoard from "./router/DashBoard/DashBoard";
import Welcome from "./router/Welcome/Welcome";
import { selectIsAuthenticated } from "./store/User/user.selector";

axios.defaults.baseURL = "http://localhost:3001/api";
axios.defaults.withCredentials = true;

const App = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <Fragment>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            duration: 5000,
            iconTheme: {
              secondary: "#635fc7",
              primary: "#ffffff",
            },
            theme: {
              primary: "#635fc7",
              secondary: "#ffffff",
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              secondary: "#000112",
              primary: "#ea5555",
            },
            theme: {
              primary: "#000112",
              secondary: "#ea5555",
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <DashBoard /> : <Navigate to="/" />}
        />
      </Routes>
    </Fragment>
  );
};

export default App;
