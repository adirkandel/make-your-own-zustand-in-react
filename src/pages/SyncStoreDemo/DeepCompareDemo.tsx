import RenderCounter from '../../components/RenderCounter';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { CodeBlock } from '../../components/ui/code-block';
import StoreTodoFilter from './components/StoreTodoFilter';
import StoreTodoForm from './components/StoreTodoForm';
import StoreTodoList from './components/StoreTodoList';

const DeepCompareDemo = () => {
  return (
    <div className="mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Demo 4: useSyncExternalStore with Deep Comparison</CardTitle>
          <CardDescription>
            This implementation adds deep equality checks to handle nested data structures,
            preventing re-renders even when working with complex nested objects.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="demo-layout">
            <div className="code-section">
              <CodeBlock language="jsx">
{`// Deep equality function
const deepEqual = (objA, objB) => {
  if (objA === objB) return true;
  if (!objA || !objB) return false;
  
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  
  if (keysA.length !== keysB.length) return false;
  
  for (const key of keysA) {
    if (!objB.hasOwnProperty(key)) return false;
    
    if (typeof objA[key] === 'object' && objA[key] !== null) {
      if (!deepEqual(objA[key], objB[key])) return false;
    } else if (objA[key] !== objB[key]) {
      return false;
    }
  }
  
  return true;
};

// Subscribe with custom equality function
const subscribe = (callback, selector, equalityFn = deepEqual) => {
  const listener = {
    callback,
    selector,
    prevValue: selector(state),
    equalityFn
  };
  
  listeners.add(listener);
  return () => listeners.delete(listener);
};

// Custom hook with equality function parameter
const useStore = (selector, equalityFn = deepEqual) => {
  return useSyncExternalStore(
    (callback) => todoStore.subscribe(callback, selector, equalityFn),
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

export default DeepCompareDemo;
