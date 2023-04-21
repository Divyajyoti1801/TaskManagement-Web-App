import cookieParser from "cookie-parser";
import express from "express";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

//Initial Configuration
const app = express();
app.use(express.json());
app.use(cookieParser());

//Route Imports
import userRouter from "./routes/userRoute.js";

//Route Entrypoint
app.use("/api", userRouter);

//Error Middleware To Handle Error
app.use(errorMiddleware);

export default app;
