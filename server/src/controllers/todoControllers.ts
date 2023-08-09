import { Request, Response } from "express";
import TodoModel from "./../models/todoModel";
import { ITodo } from "../types/todo";

/**
 * Create a new todo.
 *
 * @route POST /api/todos
 * @method POST
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @returns {void}
 */
export const createTodo = async (req: Request, res: Response) => {
  try {
    const newTodo: ITodo = req.body;
    const todo = await TodoModel.create(newTodo);
    res.status(201).json(todo);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the todo" });
  }
};

/**
 * Get all todos.
 *
 * @route GET /api/todos/:userId
 * @method GET
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @returns {void}
 */
export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const todos = await TodoModel.find({ userId });
    res.status(200).json(todos);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get sorted and filtered todos.
 *
 * @route GET /api/todos/filtered-todos/:userId
 * @method GET
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @returns {void}
 */
export const getSortedAndFilteredTodos = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;
    const { sortBy, filterBy } = req.query;

    let sortOptions: Record<string, any> = {};
    if (sortBy === "dueDate") {
      sortOptions = { dueDate: 1 };
    } else if (sortBy === "completionStatus") {
      sortOptions = { done: 1 };
    }

    let filterOptions: Record<string, any> = {};
    if (filterBy === "completed") {
      filterOptions = { done: true };
    } else if (filterBy === "incomplete") {
      filterOptions = { done: false };
    }

    const todos: ITodo[] = await TodoModel.find({
      userId,
      ...filterOptions,
    }).sort(sortOptions);
    res.status(200).json(todos);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update a todo.
 *
 * @route PUT /api/todos/:id
 * @method PUT
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @returns {void}
 */
export const updateTodo = async (req: Request, res: Response) => {
  try {
    const todoId = req.params.id;
    const updatedTodo: ITodo = req.body;
    const todo = await TodoModel.findByIdAndUpdate(todoId, updatedTodo, {
      new: true,
    });
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the todo" });
  }
};

/**
 * Delete a todo.
 *
 * @route DELETE /api/todos/:id
 * @method DELETE
 * @returns {void}
 */
export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const todoId = req.params.id;
    const deletedTodo = await TodoModel.findByIdAndRemove(todoId);
    if (deletedTodo) {
      res
        .status(204)
        .send({ success: true, message: "Todo deleted successfully." });
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the todo" });
  }
};
