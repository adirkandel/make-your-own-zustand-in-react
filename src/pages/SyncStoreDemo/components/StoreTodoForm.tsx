import TodoForm from '../../../components/TodoForm';
import { useTodoActions } from '../../../lib/basic-sync-store';

const StoreTodoForm = () => {
  const { addTodo } = useTodoActions();

  return (
    <TodoForm onAddTodo={addTodo} />
  );
};

export default StoreTodoForm;
