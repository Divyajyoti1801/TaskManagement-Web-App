import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    columns: [
      {
        name: {
          type: String,
          required: true,
        },
        tasks: [
          {
            title: {
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
            subtasks: [
              {
                title: {
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
