import { memo } from 'react';
import { Todo } from '../lib/types';
import TodoItem from './TodoItem';
import RenderCounter from './RenderCounter';

interface TodoListProps {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onUpdatePriority: (id: string, priority: 'low' | 'medium' | 'high') => void;
  onAddTag: (id: string, tag: string) => void;
  onRemoveTag: (id: string, tag: string) => void;
  onAddNote: (id: string, note: string) => void;
}

const TodoList = ({
  todos,
  filter,
  onToggle,
  onRemove,
  onUpdatePriority,
  onAddTag,
  onRemoveTag,
  onAddNote
}: TodoListProps) => {
  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <RenderCounter componentName="TodoList">
      <div className="todo-list">
        {filteredTodos.length === 0 ? (
          <p>No todos to display.</p>
        ) : (
          filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onRemove={onRemove}
              onUpdatePriority={onUpdatePriority}
              onAddTag={onAddTag}
              onRemoveTag={onRemoveTag}
              onAddNote={onAddNote}
            />
          ))
        )}
      </div>
    </RenderCounter>
  );
};

export default memo(TodoList);
