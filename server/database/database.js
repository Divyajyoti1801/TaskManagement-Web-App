import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "taskmanagement",
    })
    .then((DB) => console.log(`DATABASE CONNECTED: ${DB.connection.host}`));
};

export default connectDB;
