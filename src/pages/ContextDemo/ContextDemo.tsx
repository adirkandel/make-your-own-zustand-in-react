import { TodoProvider } from '../../lib/context-store';
import RenderCounter from '../../components/RenderCounter';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import ContextTodoFilter from './components/ContextTodoFilter';
import ContextTodoForm from './components/ContextTodoForm';
import ContextTodoList from './components/ContextTodoList';
import ContextTodoFavSelect from './components/ContextTodoFavSelect';

const ContextDemo = () => {
  return (
    <div className="mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Demo 1: Context + Refs + useEffect</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="demo-layout">
            <TodoProvider>
              <RenderCounter componentName="TodoApp">
                <div className="flex gap-6">
                  <div>
                      <ContextTodoForm />
                      <ContextTodoFavSelect />
                      <ContextTodoFilter />
                  </div>
                  <div>
                    <ContextTodoList />
                  </div>
                </div>
              </RenderCounter>
            </TodoProvider>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContextDemo;
