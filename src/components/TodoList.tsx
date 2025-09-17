import { memo } from "react";
import { Todo } from "../lib/types";
import RenderCounter from "./RenderCounter";

interface TodoListProps {
  todos: Todo[];
  filter: "all" | "active" | "completed";
  children: (todo: Todo) => React.ReactNode;
}

const TodoList = ({ todos, filter, children }: TodoListProps) => {
  const filteredTodos = todos.filter(todo => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <RenderCounter componentName="TodoList">
      <div className="todo-list">
        {filteredTodos.length === 0 ? (
          <p>No todos to display.</p>
        ) : (
          filteredTodos.map(todo => children(todo))
        )}
      </div>
    </RenderCounter>
  );
};

export default memo(TodoList);
