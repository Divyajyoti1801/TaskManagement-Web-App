import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
  {
    bName: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      require: true,
    },
    columns: [
      {
        cName: {
          type: String,
          required: true,
        },
        tasks: [
          {
            tName: {
              type: String,
              required: true,
            },
            description: {
              type: String,
              default: "",
            },
            status: {
              type: String,
              required: true,
            },
            column: {
              type: mongoose.Schema.Types.ObjectId,
              required: true,
            },
            board: {
              type: mongoose.Schema.Types.ObjectId,
              require: true,
            },
            subtasks: [
              {
                sName: {
                  type: String,
                  required: true,
                },
                isCompleted: {
                  type: Boolean,
                  default: false,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Boards = mongoose.model("Boards", boardSchema);

export default Boards;
