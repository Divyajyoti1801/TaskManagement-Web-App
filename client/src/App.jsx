import { Fragment } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./router/AuthPage/LoginPage";
import RegisterPage from "./router/AuthPage/RegisterPage";
import HomePage from "./router/HomePage/HomePage";

const App = () => {
  return (
    <Fragment>
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Toaster
        position="bottom-right"
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
            duration: 300,
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
