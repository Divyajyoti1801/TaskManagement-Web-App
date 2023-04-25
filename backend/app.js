import cookieParser from "cookie-parser";
import express from "express";
import { errorMiddleware } from "./middleware/ErrorMiddleware.js";

//Instance Creation
const app = express();

app.use(express.json());
app.use(cookieParser());

//Major Route Imports
import BoardRouter from "./routes/BoardRoutes.js";
import UserRouter from "./routes/UserRoutes.js";

//Major Route EndPoints
app.use("/api", UserRouter);
app.use("/api", BoardRouter);
//Middleware
app.use(errorMiddleware);

export default app;
