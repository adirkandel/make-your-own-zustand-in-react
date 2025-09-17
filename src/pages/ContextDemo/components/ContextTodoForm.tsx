import TodoForm from "../../../components/TodoForm";
import { useTodoActions } from "../../../lib/context-store";

const StoreTodoForm = () => {
  const { addTodo } = useTodoActions();

  return <TodoForm onAddTodo={addTodo} />;
};

export default StoreTodoForm;
