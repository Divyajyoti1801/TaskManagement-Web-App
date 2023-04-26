import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { errorMiddleware } from "./middleware/ErrorMiddleware.js";
//Instance Creation
const app = express();

app.use(express.json());
app.use(cookieParser());
//Use of Cross Origin Policy
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

//Major Route Imports
import BoardRouter from "./routes/BoardRoutes.js";
import TaskRouter from "./routes/TaskRoutes.js";
import UserRouter from "./routes/UserRoutes.js";

//Major Route EndPoints
app.use("/api", UserRouter);
app.use("/api", BoardRouter);
app.use("/api", TaskRouter);
//Middleware
app.use(errorMiddleware);

export default app;
