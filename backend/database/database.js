import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "taskmanagement",
    })
    .then((DB) =>
      console.log(`MongoDB Database Connected: ${DB.connection.host}`)
    );
};

export default connectDB;
