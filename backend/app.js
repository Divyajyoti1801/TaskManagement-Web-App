import cookieParser from "cookie-parser";
import express from "express";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

//Initial Configuration
const app = express();
app.use(express.json());
app.use(cookieParser());

//Route Imports
import boardRouter from "./routes/boardRoute.js";
import userRouter from "./routes/userRoute.js";

//Route Entrypoint
app.use("/api", userRouter);
app.use("/api", boardRouter);

//Error Middleware To Handle Error
app.use(errorMiddleware);

export default app;
