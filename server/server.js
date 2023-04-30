import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./database/database.js";

//UNCAUGHT EXCEPTION
process.on("uncaughtException", (error) => {
  console.log(error.message);
  console.log(`SERVER SHUTDOWN: Due to (Uncaught Exception)`);
  process.exit(1);
});

//ENVIRONMENT VARIABLE CONFIGURATION
dotenv.config();

//MONGODB DATABASE CONNECTED
connectDB();

//SERVER INSTANCE
const server = app.listen(process.env.PORT, () => {
  console.log(`SERVER connected on: ${process.env.PORT}`);
});

//UNHANDLED REJECTION
process.on("unhandledRejection", (error) => {
  console.log(error.message);
  console.log(`SERVER SHUTDOWN: Due to (Unhandled Promise Rejection)`);
  server.close(() => {
    process.exit(1);
  });
});
