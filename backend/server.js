import { config } from "dotenv";
import app from "./app.js";
import connectDB from "./config/database.js";

//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server Shutdown Due To Uncaught Exception`);
  process.exit(1);
});

//Local Environment Path Variable Configuration
config({
  path: "backend/config/config.env",
});

//Database Instance Creation
connectDB();

//Sever Initialization
const server = app.listen(process.env.PORT, () => {
  console.log(`Server Connected: http://localhost:${process.env.PORT}/`);
});

//Handling Unhandled Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server Shutdown Due To Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
