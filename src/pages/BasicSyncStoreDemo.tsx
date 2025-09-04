import { useTodos, useFilter, useTodoActions } from '../lib/basic-sync-store';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import TodoFilter from '../components/TodoFilter';
import RenderCounter from '../components/RenderCounter';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { CodeBlock } from '../components/ui/code-block';

const BasicSyncStoreDemo = () => {
  const todos = useTodos();
  const filter = useFilter();
  const {
    addTodo,
    toggleTodo,
    removeTodo,
    setFilter,
    updateTodoPriority,
    addTodoTag,
    removeTodoTag,
    addTodoNote
  } = useTodoActions();

  return (
    <div className="mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Demo 2: Basic useSyncExternalStore</CardTitle>
          <CardDescription>
            This implementation uses React's useSyncExternalStore hook to create a simple
            state management solution with a pub/sub pattern.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="demo-layout">
            <div className="code-section">
              <CodeBlock language="jsx">
{`// Create a store with subscribe/notify pattern
const createStore = (initialState) => {
  let state = initialState;
  const listeners = new Set();
  
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  
  const getState = () => state;
  
  const setState = (nextState) => {
    state = nextState;
    listeners.forEach(listener => listener());
  };
  
  return { getState, setState, subscribe };
};

// Use with useSyncExternalStore
const useStore = (selector) => {
  return useSyncExternalStore(
    todoStore.subscribe,
    () => selector(todoStore.getState())
  );
};`}
              </CodeBlock>
            </div>
            
            <div className="app-section">
              <RenderCounter componentName="TodoApp">
                <TodoForm onAddTodo={addTodo} />
                <TodoFilter filter={filter} onFilterChange={setFilter} />
                <TodoList
                  todos={todos}
                  filter={filter}
                  onToggle={toggleTodo}
                  onRemove={removeTodo}
                  onUpdatePriority={updateTodoPriority}
                  onAddTag={addTodoTag}
                  onRemoveTag={removeTodoTag}
                  onAddNote={addTodoNote}
                />
              </RenderCounter>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicSyncStoreDemo;
