import RenderCounter from '../../components/RenderCounter';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { CodeBlock } from '../../components/ui/code-block';
import StoreTodoFilter from './components/StoreTodoFilter';
import StoreTodoForm from './components/StoreTodoForm';
import StoreTodoList from './components/StoreTodoList';

const BasicSyncStoreDemo = () => {
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
                <StoreTodoForm />
                <StoreTodoFilter />
                <StoreTodoList />
              </RenderCounter>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicSyncStoreDemo;
