import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar.jsx';
import Footer from './Components/Footer.jsx';
import Home from './pages/Home.jsx';
import Search from './pages/Search.jsx';
import RecipeDetail from './pages/RecipeDetail.jsx';
import Favorites from './pages/Favorites.jsx';

// The navbar and footer show on every page; only the middle part changes
function App() {
  return (
    <div className="app">
      <Navbar />

      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
