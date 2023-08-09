"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getSortedAndFilteredTodos = exports.getAllTodos = exports.createTodo = void 0;
const todoModel_1 = __importDefault(require("./../models/todoModel"));
/**
 * Create a new todo.
 *
 * @route POST /api/todos
 * @method POST
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @returns {void}
 */
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTodo = req.body;
        const todo = yield todoModel_1.default.create(newTodo);
        res.status(201).json(todo);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "An error occurred while creating the todo" });
    }
});
exports.createTodo = createTodo;
/**
 * Get all todos.
 *
 * @route GET /api/todos/:userId
 * @method GET
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @returns {void}
 */
const getAllTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        console.log(userId);
        const todos = yield todoModel_1.default.find({ userId });
        res.status(200).json(todos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllTodos = getAllTodos;
/**
 * Get sorted and filtered todos.
 *
 * @route GET /api/todos/filtered-todos/:userId
 * @method GET
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @returns {void}
 */
const getSortedAndFilteredTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { sortBy, filterBy } = req.query;
        let sortOptions = {};
        if (sortBy === "dueDate") {
            sortOptions = { dueDate: 1 };
        }
        else if (sortBy === "completionStatus") {
            sortOptions = { done: 1 };
        }
        let filterOptions = {};
        if (filterBy === "completed") {
            filterOptions = { done: true };
        }
        else if (filterBy === "incomplete") {
            filterOptions = { done: false };
        }
        const todos = yield todoModel_1.default.find(Object.assign({ userId }, filterOptions)).sort(sortOptions);
        res.status(200).json(todos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getSortedAndFilteredTodos = getSortedAndFilteredTodos;
/**
 * Update a todo.
 *
 * @route PUT /api/todos/:id
 * @method PUT
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @returns {void}
 */
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoId = req.params.id;
        const updatedTodo = req.body;
        const todo = yield todoModel_1.default.findByIdAndUpdate(todoId, updatedTodo, {
            new: true,
        });
        if (todo) {
            res.status(200).json(todo);
        }
        else {
            res.status(404).json({ error: "Todo not found" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "An error occurred while updating the todo" });
    }
});
exports.updateTodo = updateTodo;
/**
 * Delete a todo.
 *
 * @route DELETE /api/todos/:id
 * @method DELETE
 * @returns {void}
 */
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoId = req.params.id;
        const deletedTodo = yield todoModel_1.default.findByIdAndRemove(todoId);
        if (deletedTodo) {
            res
                .status(204)
                .send({ success: true, message: "Todo deleted successfully." });
        }
        else {
            res.status(404).json({ error: "Todo not found" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "An error occurred while deleting the todo" });
    }
});
exports.deleteTodo = deleteTodo;
