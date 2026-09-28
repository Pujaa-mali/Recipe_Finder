import { NavLink } from 'react-router-dom';
import SearchBar from './Searchbar.jsx';
import { useSearch } from '../context/SearchContext.jsx';

// Logo on the left, search form in the middle, page links on the right
function Navbar() {
  const { setQuery, setCategory } = useSearch();

  // Going back to Home also empties the search form
  function clearSearchForm() {
    setQuery('');
    setCategory('');
  }

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand" onClick={clearSearchForm}>
        <h2>🍴 Recipe Finder</h2>
      </NavLink>

      <SearchBar />

      <div className="nav-links">
        <NavLink to="/" end onClick={clearSearchForm}>
          Home
        </NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
