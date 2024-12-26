import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

interface Todo {
    _id: string;
    title: string;
    isCompleted: boolean;
}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get('http://localhost:2000/api/v1/todo')
            .then(res => setTodos(res.data))
            .catch(err => {
                console.log(err);
                setError('Failed to load todos');
            });
    }, [todos]);

    const addTodo = () => {
        if (!newTodo.trim()) {
            setError('Todo title cannot be empty');
            return;
        }
        
        const todoData = { title: newTodo };
        
        axios.post('http://localhost:2000/api/v1/todo', todoData)
            .then(res => {
                setTodos([res.data, ...todos]);  // Optimistic UI update: add new todo immediately
                setNewTodo('');
                setError(null);
            })
            .catch(err => {
                console.log(err);
                setError('Failed to add todo');
            });
    };

    const toggleTodo = (id: string) => {
        const todo = todos.find(todo => todo._id === id);
        if (todo) {
            axios.put(`http://localhost:2000/api/v1/todo/${id}`, {
                isCompleted: !todo.isCompleted,  // Toggle the completion status
            })
                .then(res => {
                    // Get updated todo from response
                    const updatedTodo = res.data.updatedTodo;
                    
                    // Update state with the new todo list
                    const newTodos = todos.map(todo =>
                        todo._id === id ? updatedTodo : todo
                    );
                    setTodos(newTodos);
                })
                .catch(err => {
                    console.error(err);
                    setError('Failed to update todo');
                });
        }
    };

    const deleteTodo = (id: string) => {
        axios.delete(`http://localhost:2000/api/v1/todo/${id}`)
            .then(() => {
                const newTodos = todos.filter(todo => todo._id !== id);
                setTodos(newTodos);
            })
            .catch(err => {
                console.error(err);
                setError('Failed to delete todo');
            });
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 text-center">Todo App</h1>
            {error && <div className="text-red-600 mb-4">{error}</div>}
            <div className="mb-4 flex space-x-2">
                <input
                    type="text"
                    value={newTodo}
                    onChange={e => setNewTodo(e.target.value)}
                    placeholder="Enter a new todo"
                    className="p-2 border rounded w-full"
                />
                <button
                    onClick={addTodo}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add
                </button>
            </div>
            <ul className="space-y-2">
                {todos.map(todo => (
                    <TodoItem
                        key={todo._id}
                        todo={todo}
                        toggleTodo={toggleTodo}
                        deleteTodo={deleteTodo}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
