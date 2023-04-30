import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));

//Major Routes Imports
import userRouter from "./routes/UserRoutes.js";

//Major EndPoint
app.use("/api", userRouter);

//Middleware

export default app;
