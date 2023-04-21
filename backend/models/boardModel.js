import mongoose, { Mongoose } from "mongoose";

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  columns: [
    {
      title: {
        type: String,
        require: true,
      },
      task: [
        {
          title: {
            type: String,
            require: true,
          },
          description: {
            type: String,
            default: "",
          },
          status: {
            type: String,
            require: true,
          },
          column: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
          },
          subtasks: [
            {
              title: {
                type: String,
                require: true,
              },
              isCompleted: {
                type: Boolean,
                default: false,
              },
              createAt: {
                type: Date,
                default: new Date(Date.now),
              },
            },
          ],
          createdAt: {
            type: Date,
            default: new Date(Date.now),
          },
        },
      ],
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    require: true,
  },
});

const Boards = mongoose.model("Boards", boardSchema);

export default Boards;