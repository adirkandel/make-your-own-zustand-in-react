import TodoFavSelect from "../../../components/TodoFavSelect";
import { useStore, useTodoActions } from "../../../lib/sync-store";
import { shallowEqual } from "../../../lib/utils";

const StoreTodoFavSelect = () => {
  const { markAsFavorite } = useTodoActions();
  const todos = useStore(state => state.todos.map(todo => todo.text), shallowEqual);
  // const todosNames = useStore(
  //   state => state.todos.map(todo => ({ id: todo.id, text: todo.text })),
  //   deepEqual // NOT PERFORMANT
  // );
  const handleSubmit = (todoId: string) => {
    markAsFavorite(todoId);
  };
  return <TodoFavSelect handleSubmit={handleSubmit} todos={todos} />;
};

export default StoreTodoFavSelect;
