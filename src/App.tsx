import React, { useState, useEffect } from 'react';
import { CheckSquare } from 'lucide-react';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { useNotifications } from './hooks/useNotifications';
import type { Todo, TodoFormData } from './types';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  useNotifications(todos);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (data: TodoFormData) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      completed: false,
      ...data,
    };
    setTodos(prev => [...prev, newTodo]);
  };

  const handleToggleTodo = (id: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center mb-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
          <CheckSquare className="w-10 h-10 text-white mr-3" />
          <h1 className="text-4xl font-bold text-white">Task Manager</h1>
        </div>

        <TodoForm onSubmit={handleAddTodo} />

        <div className="mt-8 space-y-4">
          {todos.length === 0 ? (
            <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8">
              <p className="text-white text-lg">
                No tasks yet. Add one above to get started!
              </p>
            </div>
          ) : (
            todos
              .sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
              .map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;