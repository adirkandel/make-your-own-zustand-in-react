import { TodoProvider } from '../../lib/context-store';
import RenderCounter from '../../components/RenderCounter';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { CodeBlock } from '../../components/ui/code-block';
import ContextTodoFilter from './components/ContextTodoFilter';
import ContextTodoForm from './components/ContextTodoForm';
import ContextTodoList from './components/ContextTodoList';

const TodoApp = () => {
  return (
    <RenderCounter componentName="TodoApp">
      <ContextTodoForm />
      <ContextTodoFilter />
      <ContextTodoList />
    </RenderCounter>
  );
};

const ContextDemo = () => {
  return (
    <div className="mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Demo 1: Context + Refs + useEffect</CardTitle>
          <CardDescription>
            This implementation uses React Context with refs and useEffect to create a store
            that only re-renders components that depend on the changed state.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="demo-layout">
            <div className="code-section">
              <CodeBlock language="jsx">
{`// Create a context and provider
const TodoContext = createContext(null);

// Store state in refs
const stateRef = useRef({ todos: [], filter: 'all' });
const listenersRef = useRef(new Set());

// Notify function to update subscribers
const notify = () => {
  listenersRef.current.forEach(listener => listener());
};

// Custom hook with useEffect for subscriptions
function useContextSelector(selector) {
  const store = useContext(TodoContext);
  const [, forceRender] = useState({});
  const latestValueRef = useRef(selector(store));
  
  useEffect(() => {
    const listener = () => {
      const newValue = selector(store);
      if (newValue !== latestValueRef.current) {
        forceRender({});
      }
    };
    
    listenersRef.current.add(listener);
    return () => listenersRef.current.delete(listener);
  }, []);
  
  return selector(store);
}`}
              </CodeBlock>
            </div>
            
            <div className="app-section">
              <TodoProvider>
                <TodoApp />
              </TodoProvider>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContextDemo;
