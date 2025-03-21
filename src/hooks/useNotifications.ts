import { useEffect } from 'react';
import type { Todo } from '../types';

export function useNotifications(todos: Todo[]) {
  useEffect(() => {
    const requestPermission = async () => {
      if ('Notification' in window) {
        await Notification.requestPermission();
      }
    };
    requestPermission();
  }, []);

  useEffect(() => {
    const checkTodos = () => {
      const now = new Date();
      todos.forEach(todo => {
        if (todo.completed) return;
        
        const todoTime = new Date(todo.datetime);
        const timeDiff = Math.abs(todoTime.getTime() - now.getTime());
        
        if (timeDiff < 1000 && Notification.permission === 'granted') {
          new Notification('Task Due!', {
            body: `Time to complete: ${todo.title}`,
            icon: '/vite.svg'
          });
        }
      });
    };

    const interval = setInterval(checkTodos, 1000);
    return () => clearInterval(interval);
  }, [todos]);
}