import RecipeGrid from '../Components/RecipeGrid.jsx';
import EmptyState from '../Components/EmptyState.jsx';
import { useSearch } from '../context/SearchContext.jsx';

// Shows the results of the last search
function Search() {
  const { results, resultsTitle, isSearching, searchError, hasSearched } = useSearch();

  // Nobody has searched yet (for example the page was just refreshed)
  if (!hasSearched) {
    return (
      <EmptyState
        title="Search for a recipe"
        message="Type a dish name or an ingredient in the search box above."
      />
    );
  }

  return (
    <>
      <div className="results-heading">{resultsTitle}</div>

      <RecipeGrid
        recipes={results}
        isLoading={isSearching}
        error={searchError}
        emptyTitle="No recipes found"
        emptyMessage="Try a different name, ingredient, or category."
      />
    </>
  );
}

export default Search;
