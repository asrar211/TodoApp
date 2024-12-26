import React from 'react';

interface TodoItemProps {
    todo: { _id: string, title: string, isCompleted: boolean };
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo }) => {
    return (
        <li className={`flex justify-between items-center p-2 border-b ${todo.isCompleted ? 'line-through text-gray-500' : 'text-black'}`}>
            <span className="flex-1">{todo.title}</span>
            <div className="space-x-2">
                <button
                    onClick={() => toggleTodo(todo._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                    {todo.isCompleted ? 'Undo' : 'Complete'}
                </button>
                <button
                    onClick={() => deleteTodo(todo._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                    Del
                </button>
            </div>
        </li>
    );
}

export default TodoItem;
