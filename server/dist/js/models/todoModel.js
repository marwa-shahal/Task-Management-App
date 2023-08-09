"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const todoSchema = new mongoose_1.Schema({
    task: {
        type: String,
        required: [true, "Task is required"],
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required"],
        validate: {
            validator: function (value) {
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
}, { collection: "Todos", timestamps: true });
const TodoModel = (0, mongoose_1.model)("Todo", todoSchema);
exports.default = TodoModel;
