import RenderCounter from "./RenderCounter";
import { Card, CardContent } from "./ui/card";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "./ui/multi-select";

type TodoFavSelectProps = {
  handleValuesChange: (todoIds: string[]) => void;
  todos: { id: string; text: string; isFavorite: boolean }[];
};

const TodoFavSelect = ({ handleValuesChange, todos }: TodoFavSelectProps) => {
  const favoriteIds = todos.filter(todo => todo.isFavorite).map(todo => todo.id);

  return (
    <RenderCounter componentName="TodoFavSelect" orientation="horizontal">
      <Card className="border-0 shadow-none p-0">
        <CardContent className="p-0 max-w-sm">
          <MultiSelect values={favoriteIds} onValuesChange={handleValuesChange}>
            <MultiSelectTrigger className="w-full">
              <MultiSelectValue overflowBehavior="cutoff" placeholder="Select favorite todos" />
            </MultiSelectTrigger>
            <MultiSelectContent search={false}>
              <MultiSelectGroup>
                {todos?.map(todo => (
                  <MultiSelectItem key={todo.id} value={todo.id}>
                    {todo.text}
                  </MultiSelectItem>
                ))}
              </MultiSelectGroup>
            </MultiSelectContent>
          </MultiSelect>
        </CardContent>
      </Card>
    </RenderCounter>
  );
};

export default TodoFavSelect;
