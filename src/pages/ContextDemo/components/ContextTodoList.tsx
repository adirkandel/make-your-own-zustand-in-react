import { memo } from 'react';
import StoreTodoItem from './ContextTodoItem';
import { useFilter, useStore } from '../../../lib/context-store';
import TodoList from '../../../components/TodoList';

const StoreTodoList = () => {
  const todos = useStore(
    state =>
      state.todos.sort(todo => todo.isFavorite ? -1 : 1));
    const filter = useFilter();

  return (
    <TodoList todos={todos} filter={filter}>
        {(todo) => <StoreTodoItem key={todo.id} todo={todo} />}
    </TodoList>
  );
};

export default memo(StoreTodoList);
