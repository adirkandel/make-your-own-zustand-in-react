import { memo } from 'react';
import StoreTodoItem from './StoreTodoItem';
import { useFilter, useTodos } from '../../../lib/basic-sync-store';
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
