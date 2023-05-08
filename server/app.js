import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import ErrorMiddleware from "./middlewares/ErrorMiddleware.js";
const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.CLIENT],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

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
