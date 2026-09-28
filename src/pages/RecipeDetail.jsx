import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipeById, extractIngredients } from '../api/mealdb.jsx';
import FavoriteButton from '../Components/FavoriteButton.jsx';
import EmptyState from '../Components/EmptyState.jsx';

// The full recipe: photo, ingredients and instructions
function RecipeDetail() {
  const { id } = useParams(); // the recipe id from the address bar
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // When the page opens: load this recipe
  useEffect(() => {
    getRecipeById(id)
      .then(setRecipe)
      .catch(() => setError('Could not load this recipe. Please try again.'))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return <div className="detail-loading">Loading recipe...</div>;
  }

  if (error || !recipe) {
    return (
      <EmptyState
        title="Recipe not found"
        message={error || "We couldn't find that recipe."}
        action={
          <Link to="/" className="back-link">
            &larr; Back to home
          </Link>
        }
      />
    );
  }

  const ingredients = extractIngredients(recipe);

  // The instructions come as one long text: split it into separate lines
  const steps = recipe.strInstructions.split('\n').filter((line) => line.trim() !== '');

  return (
    <section className="recipe-detail">
      <Link to="/" className="back-link">
        &larr; Back to home
      </Link>

      <div className="detail-header">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />

        <div className="detail-header-info">
          <span className="detail-tag">{recipe.strCategory}</span>
          {recipe.strArea && <span className="detail-tag">{recipe.strArea}</span>}
          <h1>{recipe.strMeal}</h1>
          <FavoriteButton recipe={recipe} className="detail-favorite" />
          {recipe.strYoutube && (
            <a href={recipe.strYoutube} target="_blank" rel="noreferrer" className="video-link">
              Watch video ↗
            </a>
          )}
        </div>
      </div>

      <div className="detail-body">
        <div className="ingredients-panel">
          <h2>Ingredients</h2>
          <ul>
            {ingredients.map((item, index) => (
              <li key={index}>
                <span>{item.name}</span>
                <span className="measure">{item.measure}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="instructions-panel">
          <h2>Instructions</h2>
          {steps.map((step, index) => (
            <p key={index}>{step}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecipeDetail;
