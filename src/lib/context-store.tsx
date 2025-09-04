import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { Todo, TodoStore, initialTodos, generateId } from './types';

// Create a context for our store
const StoreContext = createContext<{
  getState: () => TodoStore;
  setState: (partial: Partial<TodoStore> | ((state: TodoStore) => Partial<TodoStore>)) => void;
  subscribe: (listener: () => void) => () => void;
} | null>(null);

// Create a store creator function (similar to Zustand's create function)
function createStore() {
  // Initialize state
  const initialState: TodoStore = {
    todos: initialTodos,
    filter: 'all',
    addTodo: () => {},
    toggleTodo: () => {},
    removeTodo: () => {},
    setFilter: () => {},
    updateTodoPriority: () => {},
    addTodoTag: () => {},
    removeTodoTag: () => {},
    addTodoNote: () => {}
  };
  
  // Create a set of listeners
  const listeners = new Set<() => void>();
  
  // State container
  let state = { ...initialState };
  
  // Get current state
  const getState = () => state;
  
  // Update state
  const setState = (partial: Partial<TodoStore> | ((state: TodoStore) => Partial<TodoStore>)) => {
    const nextPartial = typeof partial === 'function' ? partial(state) : partial;
    
    // Only update if there are changes
    if (!Object.keys(nextPartial).length) return;
    
    state = { ...state, ...nextPartial };
    
    listeners.forEach(listener => listener());
  };
  
  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  
  const addTodo = (text: string) => {
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
    
    setState(state => ({ todos: [...state.todos, newTodo] }));
  };
  
  const toggleTodo = (id: string) => {
    setState(state => ({
      todos: state.todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    }));
  };
  
  const removeTodo = (id: string) => {
    setState(state => ({
      todos: state.todos.filter(todo => todo.id !== id)
    }));
  };
  
  const setFilter = (filter: 'all' | 'active' | 'completed') => {
    setState({ filter });
  };
  
  const updateTodoPriority = (id: string, priority: 'low' | 'medium' | 'high') => {
    setState(state => ({
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
    }));
  };
  
  const addTodoTag = (id: string, tag: string) => {
    setState(state => ({
      todos: state.todos.map(todo => 
        todo.id === id && !todo.tags.includes(tag)
          ? { ...todo, tags: [...todo.tags, tag] } 
          : todo
      )
    }));
  };
  
  const removeTodoTag = (id: string, tag: string) => {
    setState(state => ({
      todos: state.todos.map(todo => 
        todo.id === id 
          ? { ...todo, tags: todo.tags.filter(t => t !== tag) } 
          : todo
      )
    }));
  };
  
  const addTodoNote = (id: string, note: string) => {
    setState(state => ({
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
    }));
  };
  
  // Update state with actions
  state = {
    ...state,
    addTodo,
    toggleTodo,
    removeTodo,
    setFilter,
    updateTodoPriority,
    addTodoTag,
    removeTodoTag,
    addTodoNote
  };
  
  return {
    getState,
    setState,
    subscribe
  };
}

// Create the store
const store = createStore();

// Provider component
export function TodoProvider({ children }: { children: ReactNode }) {
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
}

// Custom hook to use the store
export function useStore<T>(selector: (state: TodoStore) => T): T {
  const store = useContext(StoreContext);
  
  if (!store) {
    throw new Error('useStore must be used within a TodoProvider');
  }
  
  // Get the initial state
  const [state, setState] = useState(() => selector(store.getState()));
  
  // Keep track of the selector
  const selectorRef = useRef(selector);
  useEffect(() => {
    selectorRef.current = selector;
  }, [selector]);
  
  // Keep track of the previous selected state
  const previousStateRef = useRef(state);
  
  // Subscribe to store changes
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const nextState = selectorRef.current(store.getState());
      
      // Only update if the selected state has changed
      if (nextState !== previousStateRef.current) {
        previousStateRef.current = nextState;
        setState(nextState);
      }
    });
    
    return unsubscribe;
  }, [store]);
  
  return state;
}

// Convenience hooks
export function useTodos() {
  return useStore(state => state.todos);
}

export function useFilter() {
  return useStore(state => state.filter);
}

export function useTodoActions() {
  return useStore(state => ({
    addTodo: state.addTodo,
    toggleTodo: state.toggleTodo,
    removeTodo: state.removeTodo,
    setFilter: state.setFilter,
    updateTodoPriority: state.updateTodoPriority,
    addTodoTag: state.addTodoTag,
    removeTodoTag: state.removeTodoTag,
    addTodoNote: state.addTodoNote
  }));
}