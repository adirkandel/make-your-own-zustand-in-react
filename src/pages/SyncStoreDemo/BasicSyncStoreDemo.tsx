import RenderCounter from "../../components/RenderCounter";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import StoreTodoFilter from "./components/StoreTodoFilter";
import StoreTodoForm from "./components/StoreTodoForm";
import StoreTodoList from "./components/StoreTodoList";
import StoreTodoFavSelect from "./components/StoreTodoFavSelect";
import StoreFavoritesList from "./components/StoreFavoritesList";

const BasicSyncStoreDemo = () => {
  return (
    <div className="mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Demo 2: Basic useSyncExternalStore</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="demo-layout">
            <RenderCounter componentName="TodoApp">
              <div className="flex gap-6">
                <div>
                  <StoreTodoForm />
                  <StoreTodoFilter />
                  <StoreTodoFavSelect />
                  <StoreFavoritesList />
                </div>
                <div>
                  <StoreTodoList />
                </div>
              </div>
            </RenderCounter>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicSyncStoreDemo;
