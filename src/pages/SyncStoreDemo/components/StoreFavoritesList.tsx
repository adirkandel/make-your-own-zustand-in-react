import FavoritesList from "../../../components/FavoritesList";
import { useStore } from "../../../lib/sync-store";
import { shallowEqual } from "../../../lib/utils";

const StoreFavoritesList = () => {
  const favorites = useStore(
    state => state.todos.filter(todo => todo.isFavorite).map(todo => todo.text),
    shallowEqual
  );

  return <FavoritesList favorites={favorites} />;
};

export default StoreFavoritesList;

