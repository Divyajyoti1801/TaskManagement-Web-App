import axios from "axios";
import { Fragment } from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./router/AuthPage/LoginPage";
import RegisterPage from "./router/AuthPage/RegisterPage";
import DashBoard from "./router/DashBoard/DashBoard";
import HomePage from "./router/HomePage/HomePage";
import { selectIsAuthenticated } from "./store/User/user.selector";

axios.defaults.baseURL = "http://localhost:3001/api";
axios.defaults.withCredentials = false;

const App = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <Fragment>
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <DashBoard /> : <Navigate to="/" />}
        />
      </Routes>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            duration: 3000,
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
            duration: 3000,
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
    </Fragment>
  );
};

export default App;
