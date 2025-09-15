import { memo } from 'react';
import StoreTodoItem from './ContextTodoItem';
import { useFilter, useTodos } from '../../../lib/context-store';
import TodoList from '../../../components/TodoList';

const StoreTodoList = () => {
    const todos = useTodos();
    const filter = useFilter();

  return (
    <TodoList todos={todos} filter={filter}>
        {(todo) => <StoreTodoItem key={todo.id} todo={todo} />}
    </TodoList>
  );
};

export default memo(StoreTodoList);
