import TodoFavSelect from "../../../components/TodoFavSelect";
import { useStore, useTodoActions } from "../../../lib/context-store";
import { deepEqual } from "../../../lib/utils";

const ContextTodoFavSelect = () => {
  const { markAsFavorite } = useTodoActions();
  const todos = useStore(
    state =>
      state.todos.map(todo => ({
        id: todo.id,
        text: todo.text,
        isFavorite: todo.isFavorite,
      })),
    deepEqual,
  );

  const handleValuesChange = (selectedIds: string[]) => {
    // Get currently favorite IDs
    const currentFavorites = todos.filter(todo => todo.isFavorite).map(todo => todo.id);

    // Add todos that should be favorites but aren't
    selectedIds.forEach(id => {
      if (!currentFavorites.includes(id)) {
        markAsFavorite(id);
      }
    });

    // Add todos that shouldn't be favorites but are
    currentFavorites.forEach(id => {
      if (!selectedIds.includes(id)) {
        markAsFavorite(id);
      }
    });
  };

  return <TodoFavSelect handleValuesChange={handleValuesChange} todos={todos} />;
};

export default ContextTodoFavSelect;
