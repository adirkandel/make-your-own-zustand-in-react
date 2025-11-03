import { memo } from "react";
import StoreTodoItem from "./StoreTodoItem";
import { useFilter, useStore } from "../../../lib/sync-store";
import TodoList from "../../../components/TodoList";
import { deepEqual } from "../../../lib/utils";

const StoreTodoList = () => {
  const todos = useStore(state => [...state.todos].sort(todo => (todo.isFavorite ? -1 : 1)), deepEqual);
  const filter = useFilter();

  return (
    <TodoList todos={todos} filter={filter}>
      {todo => <StoreTodoItem key={todo.id} todo={todo} />}
    </TodoList>
  );
};

export default memo(StoreTodoList);
