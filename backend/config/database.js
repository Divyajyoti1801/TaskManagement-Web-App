import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_DB, {
      dbName: "taskmanagement",
    })
    .then((DB) => console.log(`Database Connected: ${DB.connection.host}`));
};

export default connectDB;
