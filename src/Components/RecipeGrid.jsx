import RecipeCard from './RecipeCard.jsx';
import EmptyState from './EmptyState.jsx';

// Shows the recipe cards, or a loading / error / empty message instead
function RecipeGrid({ recipes, isLoading, error, emptyTitle, emptyMessage }) {
  // While loading: six grey placeholder cards
  if (isLoading) {
    return (
      <div className="recipe-results">
        {[1, 2, 3, 4, 5, 6].map((number) => (
          <div className="recipe-card skeleton-card" key={number} />
        ))}
      </div>
    );
  }

  if (error) {
    return <EmptyState title="Something went wrong" message={error} />;
  }

  if (recipes.length === 0) {
    return <EmptyState title={emptyTitle} message={emptyMessage} />;
  }

  return (
    <section className="recipe-results">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.idMeal} recipe={recipe} />
      ))}
    </section>
  );
}

export default RecipeGrid;
