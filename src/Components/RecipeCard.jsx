import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton.jsx';

// One recipe in the grid: photo, name and small tags. Click it to open the recipe.
function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <Link to={`/recipe/${recipe.idMeal}`} className="recipe-card-link">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        <div className="recipe-card-body">
          <h3>{recipe.strMeal}</h3>
          <div className="recipe-card-meta">
            {recipe.strCategory && <span className="meta-tag">{recipe.strCategory}</span>}
            {recipe.strArea && <span className="meta-tag muted">{recipe.strArea}</span>}
          </div>
        </div>
      </Link>
      <FavoriteButton recipe={recipe} />
    </div>
  );
}

export default RecipeCard;
