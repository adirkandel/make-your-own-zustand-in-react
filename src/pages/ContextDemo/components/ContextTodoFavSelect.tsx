import TodoFavSelect from "../../../components/TodoFavSelect";
import { useStore, useTodoActions } from "../../../lib/context-store";
import { deepEqual } from "../../../lib/utils";

const ContextTodoFavSelect = () => {
  const { markAsFavorite } = useTodoActions();
  // const todosNames = useStore(
  //   state => state.todos.map(todo => todo.text),
  // );
  const todosNames = useStore(
    state => state.todos.map(todo => ({ id: todo.id, text: todo.text })),
    deepEqual // NOT PERFORMANT
  );
  const handleSubmit = (todoId: string) => {
    markAsFavorite(todoId);
  };
  return <TodoFavSelect handleSubmit={handleSubmit} todosNames={todosNames} />;
};

export default ContextTodoFavSelect;
