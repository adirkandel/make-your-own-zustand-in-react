import { useRef, useSyncExternalStore } from "react";
import { Todo, TodoStore, initialTodos, generateId } from "./types";
import { createStore } from "./utils";

// Create our todo store
const todoStore = createStore<Pick<TodoStore, "todos" | "filter">>({
  todos: initialTodos,
  filter: "all",
});

// Store actions
export const addTodo = (text: string) => {
  const state = todoStore.getState();
  const newTodo: Todo = {
    id: generateId(),
    text,
    completed: false,
    tags: [],
    isFavorite: false,
    metadata: {
      createdAt: new Date().toISOString(),
      priority: "medium",
    },
  };

  todoStore.setState({
    ...state,
    todos: [...state.todos, newTodo],
  });
};

export const markAsFavorite = (id: string) => {
  const state = todoStore.getState();
  todoStore.setState({
    ...state,
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, isFavorite: !todo.isFavorite } : todo
    ),
  });
};

export const toggleTodo = (id: string) => {
  const state = todoStore.getState();
  todoStore.setState({
    ...state,
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ),
  });
};

export const removeTodo = (id: string) => {
  const state = todoStore.getState();
  todoStore.setState({
    ...state,
    todos: state.todos.filter(todo => todo.id !== id),
  });
};

export const setFilter = (filter: "all" | "active" | "completed") => {
  const state = todoStore.getState();
  todoStore.setState({
    ...state,
    filter,
  });
};

export const updateTodoPriority = (id: string, priority: "low" | "medium" | "high") => {
  const state = todoStore.getState();
  todoStore.setState({
    ...state,
    todos: state.todos.map(todo =>
      todo.id === id
        ? {
            ...todo,
            metadata: {
              ...todo.metadata,
              priority,
            },
          }
        : todo
    ),
  });
};

export const addTodoTag = (id: string, tag: string) => {
  const state = todoStore.getState();
  todoStore.setState({
    ...state,
    todos: state.todos.map(todo =>
      todo.id === id && !todo.tags.includes(tag) ? { ...todo, tags: [...todo.tags, tag] } : todo
    ),
  });
};

export const removeTodoTag = (id: string, tag: string) => {
  const state = todoStore.getState();
  todoStore.setState({
    ...state,
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, tags: todo.tags.filter(t => t !== tag) } : todo
    ),
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
              notes: note,
            },
          }
        : todo
    ),
  });
};

// Custom hooks for using the store
export const useStore = <T>(
  selector: (state: Pick<TodoStore, "todos" | "filter">) => T,
  equalityFn?: (a: T, b: T) => boolean
): T => {
  const snapshotCache = useRef<T | undefined>(undefined);
  return useSyncExternalStore(todoStore.subscribe, () => {
    const nextSnapshot = selector(todoStore.getState());
    if (
      snapshotCache.current &&
      (equalityFn?.(nextSnapshot, snapshotCache.current) || nextSnapshot === snapshotCache.current)
    ) {
      return snapshotCache.current;
    }
    snapshotCache.current = nextSnapshot;
    return nextSnapshot;
  });
};

// Specific selectors
export const useFilter = () => useStore(state => state.filter);
export const useTodoActions = (): Omit<TodoStore, "todos" | "filter"> => {
  return {
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
};
