import RecipeGrid from '../Components/RecipeGrid.jsx';
import { useFavorites } from '../context/FavoritesContext.jsx';

// All the recipes the user saved with the heart button
function Favorites() {
  const { favorites } = useFavorites();

  return (
    <>
      <div className="page-header">
        <h1>Your Favorites</h1>
        <p>Recipes you've saved for later.</p>
      </div>

      <RecipeGrid
        recipes={favorites}
        isLoading={false}
        error=""
        emptyTitle="No favorites yet"
        emptyMessage="Tap the heart on a recipe to save it here."
      />
    </>
  );
}

export default Favorites;
