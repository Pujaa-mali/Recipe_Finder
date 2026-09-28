// All calls to TheMealDB (a free recipe API, no sign-up needed) live in this
// file, so the rest of the app never has to write a URL.
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Asks the API for something and returns the list of meals it found.
// When nothing is found the API sends null, so we return an empty list.
async function fetchMeals(path) {
  const response = await fetch(`${BASE_URL}/${path}`);
  if (!response.ok) throw new Error('Could not reach the recipe API');
  const data = await response.json();
  return data.meals || [];
}

export function searchRecipesByName(name) {
  return fetchMeals(`search.php?s=${encodeURIComponent(name)}`);
}

// Note: this one only gives back the id, name and photo of each recipe.
export function searchRecipesByIngredient(ingredient) {
  return fetchMeals(`filter.php?i=${encodeURIComponent(ingredient)}`);
}

export function getRecipesByCategory(category) {
  return fetchMeals(`filter.php?c=${encodeURIComponent(category)}`);
}

export async function getRecipeById(id) {
  const meals = await fetchMeals(`lookup.php?i=${id}`);
  return meals[0];
}

export async function getRandomRecipe() {
  const meals = await fetchMeals('random.php');
  return meals[0];
}

export async function getCategories() {
  const meals = await fetchMeals('list.php?c=list');
  return meals.map((meal) => meal.strCategory);
}

// The API stores ingredients as strIngredient1 ... strIngredient20 (and
// strMeasure1 ... strMeasure20). This turns them into one simple list.
export function extractIngredients(recipe) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const name = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (name && name.trim()) {
      ingredients.push({ name: name.trim(), measure });
    }
  }

  return ingredients;
}
