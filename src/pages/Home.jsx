import HeroCarousel from '../Components/HeroCarousel.jsx';
import RecipeGrid from '../Components/RecipeGrid.jsx';
import { useSearch } from '../context/SearchContext.jsx';

// Landing page: banner + popular recipes
function Home() {
  const { popular, isPopularLoading, popularError, popularTitle } = useSearch();

  return (
    <>
      <HeroCarousel />

      <div className="page-header">
        <h1>Recipe Finder</h1>
        <p>Find delicious recipes easily.</p>
      </div>

      <div className="results-heading">{popularTitle}</div>

      <RecipeGrid
        recipes={popular}
        isLoading={isPopularLoading}
        error={popularError}
        emptyTitle="No recipes found"
        emptyMessage="Try again in a moment."
      />
    </>
  );
}

export default Home;
