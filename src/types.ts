export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  datetime: string;
  description?: string;
}

export interface TodoFormData {
  title: string;
  datetime: string;
  description?: string;
}