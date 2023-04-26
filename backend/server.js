import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./database/database.js";

//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(err.message);
  console.log(`Server Shutting Down Due To Uncaught Exception`);
});

//Environment Variable Configuration
dotenv.config();

//MongoDB Database Connect
connectDB();

//Server Instance
const server = app.listen(process.env.PORT || 4000, () => {
  console.log(
    `Server Connect Port: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

//Handling Uncaught Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(err.message);
  console.log("Server Shutting Down Due To Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
