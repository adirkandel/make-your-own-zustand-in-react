import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { Todo, TodoStore, initialTodos, generateId } from './types';
import { createStore } from './utils';

// Create the store
const todoStore = createStore<Pick<TodoStore, 'todos' | 'filter'>>({
  todos: initialTodos,
  filter: 'all'
});

const addTodo = (text: string) => {
  const newTodo: Todo = {
    id: generateId(),
    text,
    completed: false,
    tags: [],
    isFavorite: false,
    metadata: {
      createdAt: new Date().toISOString(),
      priority: 'medium'
    }
  };
  
  todoStore.setState(state => ({ todos: [...state.todos, newTodo] }));
};

const markAsFavorite = (id: string) => {
  todoStore.setState(state => ({
    ...state,
    todos: state.todos.map(todo => todo.id === id ? { ...todo, isFavorite: !todo.isFavorite } : todo)
  }));
};

const toggleTodo = (id: string) => {
  todoStore.setState(state => ({
    todos: state.todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  }));
};

const removeTodo = (id: string) => {
  todoStore.setState(state => ({
    todos: state.todos.filter(todo => todo.id !== id)
  }));
};

const setFilter = (filter: 'all' | 'active' | 'completed') => {
  todoStore.setState({ filter });
};

const updateTodoPriority = (id: string, priority: 'low' | 'medium' | 'high') => {
  todoStore.setState(state => ({
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
  todoStore.setState(state => ({
    todos: state.todos.map(todo => 
      todo.id === id && !todo.tags.includes(tag)
        ? { ...todo, tags: [...todo.tags, tag] } 
        : todo
    )
  }));
};

const removeTodoTag = (id: string, tag: string) => {
  todoStore.setState(state => ({
    todos: state.todos.map(todo => 
      todo.id === id 
        ? { ...todo, tags: todo.tags.filter(t => t !== tag) } 
        : todo
    )
  }));
};

const addTodoNote = (id: string, note: string) => {
  todoStore.setState(state => ({
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

const StoreContext = createContext<typeof todoStore | null>(null);

export function TodoProvider({ children }: { children: ReactNode }) {
  return (
    <StoreContext.Provider value={todoStore}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore<T>(
  selector: (state: Pick<TodoStore, 'todos' | 'filter'>) => T,
  equalityFn?: (a: T, b: T) => boolean
): T {
  const store = useContext(StoreContext);
  
  if (!store) {
    throw new Error('useStore must be used within a TodoProvider');
  }
  
  const [state, setState] = useState(() => selector(store.getState()));
  
  const selectorRef = useRef(selector);
  useEffect(() => {
    selectorRef.current = selector;
  }, [selector]);
  
  // const previousStateRef = useRef(state);
  const snapshotCache = useRef<T | undefined>(undefined);
  
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // const nextState = selectorRef.current(store.getState());
      
      // Only update if the selected state has changed
      // if (nextState !== previousStateRef.current) {
      //   previousStateRef.current = nextState;
      //   setState(nextState);
      // }

      const nextSnapshot = selector(todoStore.getState());
      if (snapshotCache.current && (equalityFn?.(nextSnapshot, snapshotCache.current) || nextSnapshot === snapshotCache.current)) {
        return
      }
      snapshotCache.current = nextSnapshot;
      return setState(nextSnapshot);
    });
    
    return () => {
      unsubscribe()
    };
  }, [store]);
  
  return state;
}

export function useFilter() {
  return useStore(state => state.filter);
}

export function useTodoActions(): Omit<TodoStore, 'todos' | 'filter'> {
  return{
    addTodo,
    markAsFavorite,
    toggleTodo,
    removeTodo,
    setFilter,
    updateTodoPriority,
    addTodoTag,
    removeTodoTag,
    addTodoNote,
  };
}