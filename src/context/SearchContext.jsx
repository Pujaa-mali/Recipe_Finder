import { createContext, useContext, useState, useEffect } from 'react';
import {
  searchRecipesByName,
  searchRecipesByIngredient,
  getRecipesByCategory,
  getCategories,
} from '../api/mealdb.jsx';

const SearchContext = createContext();

// The Home page shows the recipes of this category
const POPULAR_CATEGORY = 'Chicken';

export function SearchProvider({ children }) {
  // What the user typed or picked in the navbar search form
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  // Recipes shown on the Home page
  const [popular, setPopular] = useState([]);
  const [isPopularLoading, setIsPopularLoading] = useState(true);
  const [popularError, setPopularError] = useState('');

  // Recipes shown on the Search page
  const [results, setResults] = useState([]);
  const [resultsTitle, setResultsTitle] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // When the app opens: load the category list and the popular recipes
  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]));

    getRecipesByCategory(POPULAR_CATEGORY)
      .then(setPopular)
      .catch(() => setPopularError('Could not load recipes. Please try again.'))
      .finally(() => setIsPopularLoading(false));
  }, []);

  // Search by name first. If nothing matches, try the text as an ingredient.
  // If only a category is chosen, show every recipe of that category.
  async function runSearch() {
    const text = query.trim();
    if (text === '' && category === '') return;

    setHasSearched(true);
    setIsSearching(true);
    setSearchError('');

    try {
      if (text === '') {
        setResultsTitle(`${category} recipes`);
        setResults(await getRecipesByCategory(category));
      } else {
        setResultsTitle(`Results for "${text}"`);

        let found = await searchRecipesByName(text);

        // Keep only the chosen category (if there is one)
        if (category !== '') {
          found = found.filter((recipe) => recipe.strCategory === category);
        }

        // Nothing found by name, so try it as an ingredient
        if (found.length === 0) {
          found = await searchRecipesByIngredient(text);
        }

        setResults(found);
      }
    } catch {
      setSearchError('Could not fetch recipes. Please try again.');
    } finally {
      setIsSearching(false);
    }
  }

  const value = {
    query,
    setQuery,
    category,
    setCategory,
    categories,
    popular,
    isPopularLoading,
    popularError,
    popularTitle: `Popular: ${POPULAR_CATEGORY} recipes`,
    results,
    resultsTitle,
    isSearching,
    searchError,
    hasSearched,
    runSearch,
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

// Short helper so components can write: const { query } = useSearch();
export function useSearch() {
  return useContext(SearchContext);
}
