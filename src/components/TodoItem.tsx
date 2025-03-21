import React from 'react';
import { CheckCircle, Circle, Trash2, Clock } from 'lucide-react';
import type { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const datetime = new Date(todo.datetime);
  const formattedDate = datetime.toLocaleDateString();
  const formattedTime = datetime.toLocaleTimeString();

  return (
    <div className={`flex items-start space-x-4 p-6 rounded-2xl shadow-xl backdrop-blur-lg transition-all duration-200 ${
      todo.completed ? 'bg-white/20 border-0' : 'bg-white/10 border-0'
    }`}>
      <button
        onClick={() => onToggle(todo.id)}
        className="mt-1 text-white hover:scale-110 transition-transform duration-200 focus:outline-none"
      >
        {todo.completed ? (
          <CheckCircle className="w-6 h-6" />
        ) : (
          <Circle className="w-6 h-6" />
        )}
      </button>

      <div className="flex-1">
        <h3 className={`text-lg font-medium ${todo.completed ? 'line-through text-white/70' : 'text-white'}`}>
          {todo.title}
        </h3>
        {todo.description && (
          <p className={`mt-1 text-sm ${todo.completed ? 'text-white/50' : 'text-white/80'}`}>
            {todo.description}
          </p>
        )}
        <div className="flex items-center mt-2 text-sm text-white/70">
          <Clock className="w-4 h-4 mr-1" />
          <span>{formattedDate} at {formattedTime}</span>
        </div>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="text-white/70 hover:text-red-300 hover:scale-110 transition-all duration-200 focus:outline-none"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}