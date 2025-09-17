import { memo } from 'react';
import { Todo } from '../../../lib/types';
import TodoItem from '../../../components/TodoItem';
import { useTodoActions } from '../../../lib/sync-store';

const StoreTodoItem = ({ todo }: { todo: Todo }) => {
  const {
    toggleTodo,
    removeTodo,
    updateTodoPriority,
    addTodoTag,
    removeTodoTag,
    addTodoNote
  } = useTodoActions();

  return (
    <TodoItem
      todo={todo}
      onToggle={toggleTodo}
      onRemove={removeTodo}
      onUpdatePriority={updateTodoPriority}
      onAddTag={addTodoTag}
      onRemoveTag={removeTodoTag}
      onAddNote={addTodoNote} />
  );
};

export default memo(StoreTodoItem);
