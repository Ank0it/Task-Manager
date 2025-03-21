import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import type { TodoFormData } from '../types';

interface TodoFormProps {
  onSubmit: (data: TodoFormData) => void;
}

export function TodoForm({ onSubmit }: TodoFormProps) {
  const [formData, setFormData] = useState<TodoFormData>({
    title: '',
    datetime: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.datetime) return;
    onSubmit(formData);
    setFormData({ title: '', datetime: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-white">
          Task Title
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-xl border-0 bg-white/20 backdrop-blur-sm text-white placeholder-white/60 shadow-sm focus:ring-2 focus:ring-white/50 focus:border-transparent"
          placeholder="Enter task title"
          required
        />
      </div>

      <div>
        <label htmlFor="datetime" className="block text-sm font-medium text-white">
          Date and Time
        </label>
        <input
          type="datetime-local"
          id="datetime"
          value={formData.datetime}
          onChange={(e) => setFormData({ ...formData, datetime: e.target.value })}
          className="mt-1 block w-full rounded-xl border-0 bg-white/20 backdrop-blur-sm text-white shadow-sm focus:ring-2 focus:ring-white/50 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-white">
          Description (optional)
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-xl border-0 bg-white/20 backdrop-blur-sm text-white placeholder-white/60 shadow-sm focus:ring-2 focus:ring-white/50 focus:border-transparent"
          rows={3}
          placeholder="Add task description"
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center px-4 py-3 border-0 rounded-xl shadow-lg text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50 transform transition-all duration-200 hover:scale-[1.02]"
      >
        <PlusCircle className="w-5 h-5 mr-2" />
        Add Task
      </button>
    </form>
  );
}