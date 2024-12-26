import express from 'express';
import { addTodos, deleteTodo, getTodos, updateTodo } from '../controllers/todoController';

const router = express.Router();

router.get('/', getTodos);
router.post('/', addTodos);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;