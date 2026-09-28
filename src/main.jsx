import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import { SearchProvider } from './context/SearchContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <FavoritesProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </FavoritesProvider>
  </BrowserRouter>,
);
