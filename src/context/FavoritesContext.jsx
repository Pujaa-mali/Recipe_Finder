import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.jsx';

// Context lets any component read the favorites without passing props down.
const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  // Like useState, but the list is also saved in localStorage
  const [favorites, setFavorites] = useLocalStorage('recipe-finder-favorites', []);

  function isFavorite(id) {
    return favorites.some((recipe) => recipe.idMeal === id);
  }

  // Adds the recipe if it is not saved yet, removes it if it is
  function toggleFavorite(recipe) {
    if (isFavorite(recipe.idMeal)) {
      setFavorites(favorites.filter((item) => item.idMeal !== recipe.idMeal));
    } else {
      setFavorites([...favorites, recipe]);
    }
  }

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Short helper so components can write: const { favorites } = useFavorites();
export function useFavorites() {
  return useContext(FavoritesContext);
}
