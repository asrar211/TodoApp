import { Request, Response } from 'express';
import Todo, { ITodo } from '../models/Todo';
import mongoose from 'mongoose';

export const addTodos = async(req: Request, res: Response): Promise<void> => {
    try {
        const newTodo: ITodo = new Todo(req.body);
        const savedTodo: ITodo = await newTodo.save();
        res.status(200).send({
            message: 'Todo added successfully',
            savedTodo
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).send({ message: 'Failed to add todo', error: error.message });
    }
}

export const getTodos = async(req: Request, res: Response): Promise<void> => {
    try {
        const allTodos: ITodo[] = await Todo.find();
        res.status(200).send(allTodos);
    } catch (error: any) {
        console.error(error);
        res.status(500).send({ message: 'Failed to retrieve todos', error: error.message });
    }
}

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { completed: req.body.isCompleted }, // Toggle the isCompleted field
            { new: true } // Return the updated todo
        );
        if (updatedTodo) {
            res.status(200).send({
                message: 'Todo updated successfully',
                updatedTodo, // Return the updated todo object
            });
        } else {
            res.status(404).send({ message: 'Todo not found' });
        }
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).send({ message: 'Failed to update todo' });
    }
};



export const deleteTodo = async(req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
         res.status(400).send({ message: 'Invalid ID format' });
    }

    try {
        const deletedTodo: ITodo | null = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
        res.status(404).send({ message: 'Todo not found' });
        }
        res.status(200).send({
            message: 'Todo deleted successfully',
            deletedTodo
        });
    } catch (error:any) {
        console.error(error);
        res.status(500).send({ message: 'Failed to delete todo', error: error.message });
    }
}
