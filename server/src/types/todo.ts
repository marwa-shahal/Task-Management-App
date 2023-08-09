import { Document } from "mongoose";
import { Schema } from "mongoose";

export interface ITodo extends Document {
  task: string;
  userId: Schema.Types.ObjectId;
  dueDate: Date;
  done: boolean;
}
