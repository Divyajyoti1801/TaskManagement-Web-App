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
import boardRouter from "./routes/BoardRoutes.js";
import userRouter from "./routes/UserRoutes.js";

//Major EndPoint
app.use("/api", userRouter);
app.use("/api", boardRouter);

//Middleware

export default app;
