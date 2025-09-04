import { useSyncExternalStore } from 'react';
import { Todo, TodoStore, initialTodos, generateId } from './types';

// Create a store with the useSyncExternalStore pattern
const createStore = <T extends Record<string, any>>(initialState: T) => {
  // Store state
  let state = initialState;
  
  // Set of listeners
  const listeners = new Set<() => void>();
  
  // Subscribe function
  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  
  // Get state function
  const getState = () => state;
  
  // Set state function
  const setState = (nextState: T) => {
    state = nextState;
    listeners.forEach(listener => listener());
  };
  
  return {
    getState,
    setState,
    subscribe
  };
};

// Create our todo store
const todoStore = createStore<{
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}>({
  todos: initialTodos,
  filter: 'all'
});

// Store actions
export const addTodo = (text: string) => {
  const state = todoStore.getState();
  const newTodo: Todo = {
    id: generateId(),
    text,
    completed: false,
    tags: [],
    metadata: {
      createdAt: new Date().toISOString(),
      priority: 'medium'
    }
  };
  
  todoStore.setState({
    ...state,
    todos: [...state.todos, newTodo]
  });
};

export const toggleTodo = (id: string) => {
  const state = todoStore.getState();
  todoStore.setState({
    ...state,
    todos: state.todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  });
};

export const removeTodo = (id: string) => {
  const state = todoStore.getState();
  todoStore.setState({
    ...state,
    todos: state.todos.filter(todo => todo.id !== id)
  });
};

export const setFilter = (filter: 'all' | 'active' | 'completed') => {
  const state = todoStore.getState();
  todoStore.setState({
    ...state,
    filter
  });
};

export const updateTodoPriority = (id: string, priority: 'low' | 'medium' | 'high') => {
  const state = todoStore.getState();
  todoStore.setState({
    ...state,
    todos: state.todos.map(todo => 
      todo.id === id 
        ? { 
            ...todo, 
            metadata: { 
              ...todo.metadata, 
              priority 
            } 
          } 
        : todo
    )
  });
};

export const addTodoTag = (id: string, tag: string) => {
  const state = todoStore.getState();
  todoStore.setState({
    ...state,
    todos: state.todos.map(todo => 
      todo.id === id && !todo.tags.includes(tag)
        ? { ...todo, tags: [...todo.tags, tag] } 
        : todo
    )
  });
};

export const removeTodoTag = (id: string, tag: string) => {
  const state = todoStore.getState();
  todoStore.setState({
    ...state,
    todos: state.todos.map(todo => 
      todo.id === id 
        ? { ...todo, tags: todo.tags.filter(t => t !== tag) } 
        : todo
    )
  });
};

export const addTodoNote = (id: string, note: string) => {
  const state = todoStore.getState();
  todoStore.setState({
    ...state,
    todos: state.todos.map(todo => 
      todo.id === id 
        ? { 
            ...todo, 
            metadata: { 
              ...todo.metadata, 
              notes: note 
            } 
          } 
        : todo
    )
  });
};

// Custom hooks for using the store
export const useStore = <T>(selector: (state: ReturnType<typeof todoStore.getState>) => T) => {
  return useSyncExternalStore(
    todoStore.subscribe,
    () => selector(todoStore.getState())
  );
};

// Specific selectors
export const useTodos = () => useStore(state => state.todos);
export const useFilter = () => useStore(state => state.filter);
export const useTodoActions = (): Omit<TodoStore, 'todos' | 'filter'> => {
  return {
    addTodo,
    toggleTodo,
    removeTodo,
    setFilter,
    updateTodoPriority,
    addTodoTag,
    removeTodoTag,
    addTodoNote
  };
};
