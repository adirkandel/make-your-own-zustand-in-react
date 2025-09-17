export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  tags: string[];
  isFavorite: boolean;
  metadata: {
    createdAt: string;
    priority: 'low' | 'medium' | 'high';
    notes?: string;
  };
}

export interface TodoStore {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  addTodo: (text: string) => void;
  markAsFavorite: (id: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  updateTodoPriority: (id: string, priority: 'low' | 'medium' | 'high') => void;
  addTodoTag: (id: string, tag: string) => void;
  removeTodoTag: (id: string, tag: string) => void;
  addTodoNote: (id: string, note: string) => void;
}

export const initialTodos: Todo[] = [
  {
    id: '1',
    text: 'Learn about useSyncExternalStore',
    completed: false,
    tags: ['react', 'hooks'],
    isFavorite: false,
    metadata: {
      createdAt: new Date().toISOString(),
      priority: 'high',
    }
  },
  {
    id: '2',
    text: 'Build a custom state management solution',
    completed: false,
    tags: ['react', 'state'],
    isFavorite: false,
    metadata: {
      createdAt: new Date().toISOString(),
      priority: 'medium',
      notes: 'Focus on performance optimization'
    }
  },
  {
    id: '3',
    text: 'Prepare demo for React IL meetup',
    completed: false,
    tags: ['presentation'],
    isFavorite: false,
    metadata: {
      createdAt: new Date().toISOString(),
      priority: 'high',
    }
  }
];

export const generateId = () => Math.random().toString(36).substring(2, 9);
