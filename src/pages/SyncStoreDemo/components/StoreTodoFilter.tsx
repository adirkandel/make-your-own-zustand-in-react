import TodoFilter from "../../../components/TodoFilter";
import { useFilter, useTodoActions } from "../../../lib/sync-store";

const StoreTodoFilter = () => {
  const { setFilter } = useTodoActions();
  const filter = useFilter();
  return <TodoFilter filter={filter} onFilterChange={setFilter} />;
};

export default StoreTodoFilter;
