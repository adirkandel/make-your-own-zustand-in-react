import RenderCounter from "./RenderCounter";
import { Card, CardContent } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type TodoFavSelectProps = {
  handleSubmit: (todoId: string) => void;
  todos: string[];
  // todos: { id: string; text: string }[];
};

const TodoFavSelect = ({ handleSubmit, todos: todosNames }: TodoFavSelectProps) => {
  return (
    <RenderCounter componentName="TodoFavSelect" orientation="horizontal">
      <Card className="border-0 shadow-none">
        <CardContent className="p-0">
          <Select onValueChange={handleSubmit} defaultValue={todosNames?.[0]}>
            <SelectTrigger>
              <SelectValue placeholder="Select favorite todo" />
            </SelectTrigger>
            <SelectContent>
              {todosNames?.map(todo => (
                <SelectItem key={todo} value={todo}>
                  {todo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </RenderCounter>
  );
};

export default TodoFavSelect;
