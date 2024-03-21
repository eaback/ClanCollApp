// ToDoApp.tsx
import React, { useState } from 'react';
import { User } from './types'; 

interface ToDo {
  id: string;
  text: string;
  createdBy: User;
}

const ToDoApp: React.FC = () => {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [inputText, setInputText] = useState('');

  const handleAddToDo = () => {
    if (inputText.trim() === '') return;

    const newToDo: ToDo = {
      id: Math.random().toString(),
      text: inputText,
      createdBy: {
        uid: 'exampleUID', // Provide the user's UID here
        nickName: 'Example User',
        firstName: 'John',
        lastName: 'Doe',
        email: 'example@example.com',
        phone: '1234567890',
      },
    };

    setTodos(prevTodos => [...prevTodos, newToDo]);
    setInputText('');
  };

  const handleDeleteToDo = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  return (
    <div className="flex flex-col h-full bg-secondary">
      <header className="bg-primary text-tertiary py-4 px-6">
        <h1 className="text-2xl font-bold">To-Do List</h1>
      </header>
      <main className="flex-1 overflow-y-auto px-6 py-4 bg-secondary">
        <div className="mb-4">
          <input
            type="text"
            className="w-full border border-tertiary text-tertiary bg-primary rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Add new to-do..."
            value={inputText}
            onChange={e => setInputText(e.target.value)}
          />
        </div>
        <button
          className="bg-primary text-tertiary px-4 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={handleAddToDo}
        >
          Add
        </button>
        <ul className="divide-y divide-tertiary">
          {todos.map(todo => (
            <li key={todo.id} className="py-2 flex justify-between items-center text-tertiary bg-primary rounded-lg m-2 p-3">
              <span>{todo.text}</span>
              <button
                className="text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={() => handleDeleteToDo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default ToDoApp;
