import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext.jsx';

// The search form in the navbar, so it is available on every page
function SearchBar() {
  const { query, setQuery, category, setCategory, categories, runSearch } = useSearch();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault(); // stop the page from reloading

    // Nothing typed and no category picked: nothing to search for
    if (query.trim() === '' && category === '') return;

    navigate('/search'); // go to the results page
    runSearch();
  }

  return (
    <form className="nav-search" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search by name or ingredient..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <select
        className="category-select"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value="">All categories</option>
        {categories.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
