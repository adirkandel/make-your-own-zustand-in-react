import RenderCounter from "./RenderCounter";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type FavoritesListProps = {
  favorites: string[];
};

const FavoritesList = ({ favorites }: FavoritesListProps) => {
  return (
    <RenderCounter componentName="FavoritesList" orientation="horizontal">
      <Card className="border-0 shadow-none">
        <CardHeader>
          <CardTitle className="text-lg">Favorites</CardTitle>
        </CardHeader>
        <CardContent>
          {favorites.length === 0 ? (
            <p className="text-sm text-muted-foreground">No favorites yet</p>
          ) : (
            <ul className="space-y-2">
              {favorites.map((title, index) => (
                <li key={index} className="text-sm">
                  {title}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </RenderCounter>
  );
};

export default FavoritesList;

