import { ITodo } from "./../types/todo";
import { model, Schema } from "mongoose";

const todoSchema: Schema = new Schema(
  {
    task: {
      type: String,
      required: [true, "Task is required"],
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },

    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
      validate: {
        validator: function (value: Date) {
          if (value < new Date()) {
            throw new Error("Due date must be in the future");
          }
          return true;
        },
      },
    },

    done: {
      type: Boolean,
      required: [true, "Done status is required"],
    },
  },
  { collection: "Todos", timestamps: true }
);


const TodoModel = model<ITodo>("Todo", todoSchema);
export default TodoModel;
