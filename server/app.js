import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import ErrorMiddleware from "./middlewares/ErrorMiddleware.js";

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
import taskRouter from "./routes/TaskRoutes.js";
import userRouter from "./routes/UserRoutes.js";

//Major EndPoint
app.use("/api", userRouter);
app.use("/api", boardRouter);
app.use("/api", taskRouter);

//Middleware
app.use(ErrorMiddleware);

export default app;
