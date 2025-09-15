import RenderCounter from '../../components/RenderCounter';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { CodeBlock } from '../../components/ui/code-block';
import StoreTodoFilter from './components/StoreTodoFilter';
import StoreTodoForm from './components/StoreTodoForm';
import StoreTodoList from './components/StoreTodoList';

const ShallowCompareDemo = () => {
  return (
    <div className="mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Demo 3: useSyncExternalStore with Shallow Comparison</CardTitle>
          <CardDescription>
            This implementation enhances our store with shallow equality checks to prevent
            unnecessary re-renders when selected state hasn't actually changed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="demo-layout">
            <div className="code-section">
              <CodeBlock language="jsx">
{`// Shallow equality function
const shallowEqual = (objA, objB) => {
  if (objA === objB) return true;
  if (!objA || !objB) return false;
  
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  
  if (keysA.length !== keysB.length) return false;
  
  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];
    if (!objB.hasOwnProperty(key) || objA[key] !== objB[key]) {
      return false;
    }
  }
  
  return true;
};

// Store with selector-aware subscriptions
const subscribe = (callback, selector) => {
  const listener = {
    callback,
    selector,
    prevValue: selector(state)
  };
  
  listeners.add(listener);
  return () => listeners.delete(listener);
};

// Notify only when selected state changes
const setState = (nextState) => {
  state = nextState;
  
  listeners.forEach(listener => {
    const newValue = listener.selector(state);
    if (!shallowEqual(newValue, listener.prevValue)) {
      listener.prevValue = newValue;
      listener.callback();
    }
  });
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

export default ShallowCompareDemo;
