import { useSyncExternalStore } from 'react';
import { Todo, TodoStore, initialTodos, generateId } from './types';

// Deep equality function
const deepEqual = (objA: any, objB: any): boolean => {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || 
      typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, key)) {
      return false;
    }

    if (typeof objA[key] === 'object' && objA[key] !== null) {
      if (!deepEqual(objA[key], objB[key])) {
        return false;
      }
    } else if (objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
};

// Create a store with the useSyncExternalStore pattern and deep comparison
const createStore = <T extends Record<string, any>>(initialState: T) => {
  // Store state
  let state = initialState;
  
  // Set of listeners with their selectors and previous values
  const listeners = new Set<{
    callback: () => void;
    selector: (state: T) => any;
    prevValue: any;
    equalityFn: (a: any, b: any) => boolean;
  }>();
  
  // Subscribe function with selector and optional equality function
  const subscribe = <U>(
    callback: () => void,
    selector: (state: T) => U,
    equalityFn: (a: U, b: U) => boolean = deepEqual
  ) => {
    const listener = {
      callback,
      selector,
      prevValue: selector(state),
      equalityFn
    };
    
    listeners.add(listener);
    
    return () => {
      listeners.delete(listener);
    };
  };
  
  // Get state function
  const getState = () => state;
  
  // Set state function
  const setState = (nextState: T) => {
    state = nextState;
    
    // Notify only the listeners whose selected state has changed
    listeners.forEach(listener => {
      const newValue = listener.selector(state);
      
      if (!listener.equalityFn(newValue, listener.prevValue)) {
        listener.prevValue = newValue;
        listener.callback();
      }
    });
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

// Custom hooks for using the store with deep comparison
export const useStore = <T>(
  selector: (state: ReturnType<typeof todoStore.getState>) => T,
  equalityFn: (a: T, b: T) => boolean = deepEqual
): T => {  
  return useSyncExternalStore(
    (callback) => todoStore.subscribe(callback, selector, equalityFn),
    () => selector(todoStore.getState())
  );
};

// Specific selectors
export const useTodos = () => useStore(state => state.todos);
export const useFilter = () => useStore(state => state.filter);

// Specialized selector for a single todo
export const useTodo = (id: string) => {
  return useStore(state => state.todos.find(todo => todo.id === id));
};

// Specialized selector for todo metadata
export const useTodoMetadata = (id: string) => {
  return useStore(state => {
    const todo = state.todos.find(todo => todo.id === id);
    return todo ? todo.metadata : undefined;
  });
};

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
