# Recipe Finder

A recipe discovery app where you can search for dishes by name or ingredient, browse by category,
view full ingredients and instructions for any recipe, and save favorites that persist across
visits. Built with React and [TheMealDB](https://www.themealdb.com/api.php)'s free public API.

Built for the React Course Project — **Option 4: Recipe Finder App**.

## Features implemented

**Core requirements (required by the assignment)**
- Search recipes **by name or by ingredient** through a single search box in the navbar — it
  tries a name match first and automatically falls back to an ingredient match if nothing's found.
- Results shown in a responsive card grid with image, title, and category.
- Full detail view for a selected recipe: ingredients with measures, step-by-step instructions,
  category/cuisine tags, and a link to the video if one exists.
- Mark/unmark recipes as favorites, persisted with `localStorage` so they survive a page refresh.
- Loading states (skeleton cards) and a "no results found" empty state.

**Stretch goals (optional, implemented anyway)**
- Filter results by category (dropdown, populated live from the API).
- Dedicated Favorites page/view using React Router.
- Home page banner carousel (auto-advancing slides with arrows and dots, using photos from the recipe API).

**Stretch goal not implemented**
- Pagination / "load more" — TheMealDB's `search.php` endpoint returns its full result set in one
  response, so this wasn't needed for the assignment's scope, but could be added client-side later.

## Requirements checklist (Section 3 of the assignment)

| Requirement | Where it's satisfied |
|---|---|
| Functional components only | Every file in `src/Components` and `src/pages` |
| 4–5+ meaningful, reusable components | 7 components (`Navbar`, `Searchbar`, `RecipeCard`, `RecipeGrid`, `FavoriteButton`, `EmptyState`) + 3 page components |
| Props for parent → child data flow | e.g. `RecipeGrid` → `RecipeCard` → `FavoriteButton`; shared search/favorites state flows through Context instead of being drilled through many layers |
| `useState` hook | Search query, category, recipes, loading/error flags (`SearchContext.jsx`), recipe detail state (`RecipeDetail.jsx`) |
| `useEffect` hook | `useLocalStorage` (favorites persistence), initial category/recipe fetch in `SearchContext.jsx`, recipe fetch on id change in `RecipeDetail.jsx` |
| List rendering with `.map()` + unique keys | Recipe cards (`key={recipe.idMeal}`), ingredients list, category `<option>`s |
| Controlled form + `onChange`/`onSubmit` | `Searchbar.jsx` (`<form onSubmit>`, controlled text input and `<select>`) |
| Conditional rendering | Loading skeletons, error message, empty-results state, empty-favorites state (`RecipeGrid.jsx`, `EmptyState.jsx`) |
| React Router (multi-page) | `/`, `/search`, `/recipe/:id`, `/favorites` (`App.jsx`) |
| Responsive layout | Media queries in `App.css` for the navbar (stacks on narrow screens), card grid, and recipe detail page |
| Readable, consistent naming | Throughout |
| Logical folder structure | `Components/`, `pages/`, `context/`, `hooks/`, `api/` |
| No unused vars/imports/dead code | `npm run lint` passes with zero errors or warnings |
| No console errors/warnings | Verified via `npm run lint` and `npm run build` |

## Layout

The search box lives in the navbar (not on the Home page) so it's available from any route: the
app name is pinned to the left, the search box fills the center, and Home/Favorites sit on the
right. Submitting a search from any page opens the separate `/search` page with the results, while
Home (`/`) stays a landing page with the banner carousel and popular recipes. Clicking Home clears the
search box and returns to that landing page.

## Technologies / libraries used

- [React 19](https://react.dev/) (functional components + hooks)
- [React Router v6](https://reactrouter.com/) for client-side routing
- [Vite](https://vitejs.dev/) as the build tool / dev server
- [TheMealDB API](https://www.themealdb.com/api.php) (free test key `1`, no signup required) for
  recipe data
- Plain CSS, no UI framework

## Project structure

```
src/
  Components/     Navbar, Searchbar, HeroCarousel, RecipeGrid, RecipeCard,
                   FavoriteButton, EmptyState, Footer
  pages/           Home, Search, RecipeDetail, Favorites
  context/         SearchContext.jsx and FavoritesContext.jsx — shared state
                   (each file also holds its own useSearch / useFavorites hook)
  hooks/           useLocalStorage.jsx — useState that also saves to localStorage
  api/             mealdb.jsx — every TheMealDB API call in one place
  App.jsx          Routes, navbar and footer
  main.jsx         Entry point: router + context providers
```

## Setup instructions

```bash
npm install
npm run dev
```

Then open the URL Vite prints (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

To lint:

```bash
npm run lint
```

## Screenshots
## Screenshots

### Home Page
![Recipe Finder Home Page](./screenshots/home.png)

### Search Results
![Recipe Finder Search Results](./screenshots/search.png)

### Recipe Details
![Recipe Finder Recipe Details](./screenshots/details.png)

### Favorite Page
![Recipe Finder Favorite Page](./screenshots/favorites.png)


## Known limitations

- Recipe data comes from TheMealDB's free public API; availability/coverage depends on their
  catalog (it doesn't have every dish).
- Ingredient search (`filter.php`) returns partial recipe data (no category), so the category
  filter only applies when searching by name.
- No pagination — searches return whatever TheMealDB's endpoints return in one response.
- No automated tests are included.

## Live demo

> Add your deployed link here after deploying to Vercel/Netlify/GitHub Pages (optional).

