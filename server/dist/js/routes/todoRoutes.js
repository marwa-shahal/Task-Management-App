"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoControllers_1 = require("./../controllers/todoControllers");
const VerifyToken_1 = __importDefault(require("../middleware/VerifyToken"));
const router = express_1.default.Router();
// Create a new todo
router.post('/', VerifyToken_1.default, todoControllers_1.createTodo);
// Get all todos
router.get('/:userId', VerifyToken_1.default, todoControllers_1.getAllTodos);
// /todos?sortBy=dueDate&filterBy=completed
// Get all todos sorted and filtered
router.get('/filtered-todos/:userId', VerifyToken_1.default, todoControllers_1.getSortedAndFilteredTodos);
// Update a todo
router.patch('/:id', VerifyToken_1.default, todoControllers_1.updateTodo);
// Delete a todo
router.delete('/:id', VerifyToken_1.default, todoControllers_1.deleteTodo);
exports.default = router;
