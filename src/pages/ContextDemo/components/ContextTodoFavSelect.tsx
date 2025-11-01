import TodoFavSelect from "../../../components/TodoFavSelect";
import { useStore, useTodoActions } from "../../../lib/context-store";
import { deepEqual } from "../../../lib/utils";

const ContextTodoFavSelect = () => {
  const { markAsFavorite } = useTodoActions();
  const todos = useStore(state => state.todos.map(todo => ({ id: todo.id, text: todo.text })), deepEqual);
  const handleSubmit = (todoId: string) => {
    markAsFavorite(todoId);
  };
  return <TodoFavSelect handleSubmit={handleSubmit} todos={todos} />;
};

export default ContextTodoFavSelect;
