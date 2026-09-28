import { useFavorites } from '../context/FavoritesContext.jsx';

// The heart button. Filled heart = saved, empty heart = not saved.
function FavoriteButton({ recipe, className = '' }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(recipe.idMeal);
  const label = saved ? 'Remove from favorites' : 'Add to favorites';

  return (
    <button
      type="button"
      className={`favorite-btn ${saved ? 'active' : ''} ${className}`}
      onClick={() => toggleFavorite(recipe)}
      aria-label={label}
      title={label}
    >
      {saved ? '♥' : '♡'}
    </button>
  );
}

export default FavoriteButton;
