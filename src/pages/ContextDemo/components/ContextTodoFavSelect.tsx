import TodoFavSelect from "../../../components/TodoFavSelect";
import { useStore, useTodoActions } from "../../../lib/context-store";

const ContextTodoFavSelect = () => {
  const { markAsFavorite } = useTodoActions();
  const todos = useStore(state => state.todos.map(todo => todo.text));
  // const todosNames = useStore(
  //   state => state.todos.map(todo => ({ id: todo.id, text: todo.text })),
  //   deepEqual // NOT PERFORMANT
  // );
  const handleSubmit = (todoId: string) => {
    markAsFavorite(todoId);
  };
  return <TodoFavSelect handleSubmit={handleSubmit} todos={todos} />;
};

export default ContextTodoFavSelect;
