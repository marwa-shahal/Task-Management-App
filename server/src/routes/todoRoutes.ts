import express from 'express';
import { createTodo, getAllTodos,getSortedAndFilteredTodos, updateTodo, deleteTodo } from './../controllers/todoControllers';
import verifyToken from '../middleware/VerifyToken';

const router = express.Router();

// Create a new todo
router.post('/',verifyToken, createTodo);

// Get all todos
router.get('/:userId',verifyToken, getAllTodos);

// /todos?sortBy=dueDate&filterBy=completed

// Get all todos sorted and filtered
router.get('/filtered-todos/:userId',verifyToken, getSortedAndFilteredTodos);

// Update a todo
router.patch('/:id',verifyToken, updateTodo);

// Delete a todo
router.delete('/:id',verifyToken, deleteTodo);

export default router;
