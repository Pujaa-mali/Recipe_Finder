import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRandomRecipe } from '../api/mealdb.jsx';

// The banner on the Home page. It changes slide by itself every 5 seconds.
function HeroCarousel() {
  const [current, setCurrent] = useState(0); // which slide is showing
  const [paused, setPaused] = useState(false); // true while the mouse is on the banner
  const [recipes, setRecipes] = useState([]); // 3 random recipes, used for the photos

  // When the page opens: get 3 random recipes. Their photos become the slide
  // backgrounds. If this fails, the slides just keep their plain colours.
  useEffect(() => {
    Promise.all([getRandomRecipe(), getRandomRecipe(), getRandomRecipe()])
      .then(setRecipes)
      .catch(() => setRecipes([]));
  }, []);

  // Link to a recipe page (or to Home if the recipe has not loaded yet)
  function recipeLink(recipe) {
    return recipe ? `/recipe/${recipe.idMeal}` : '/';
  }

  const slides = [
    {
      lines: ['Cook', 'Something New'],
      tagline: 'Try A Random Recipe',
      button: 'Surprise Me',
      link: recipeLink(recipes[0]),
    },
    {
      lines: ["Today's", 'Pick'],
      tagline: 'Chosen Just For You',
      button: 'View Recipe',
      link: recipeLink(recipes[1]),
    },
    {
      lines: ['Save Your', 'Favourites'],
      tagline: 'Build Your Own Cookbook',
      button: 'Open Favorites',
      link: '/favorites',
    },
  ];

  // Move to the next slide after 5 seconds (not while paused)
  useEffect(() => {
    if (paused) return;

    const timer = setTimeout(() => {
      setCurrent((number) => (number + 1) % slides.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [current, paused, slides.length]);

  function showPrevious() {
    setCurrent((current - 1 + slides.length) % slides.length);
  }

  function showNext() {
    setCurrent((current + 1) % slides.length);
  }

  return (
    <section
      className="hero-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* All slides sit side by side; we slide the row to show the current one */}
      <div className="hero-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((slide, index) => {
          const photo = recipes[index]?.strMealThumb;

          return (
            <div
              key={slide.button}
              className={`hero-slide slide-${index}`}
              style={photo ? { backgroundImage: `url(${photo})` } : {}}
            >
              <div className="hero-content">
                <h2>
                  {slide.lines[0]}
                  <br />
                  {slide.lines[1]}
                </h2>
                <p>{slide.tagline}</p>
                <Link to={slide.link} className="hero-cta">
                  {slide.button} &gt;
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <button type="button" className="hero-arrow prev" onClick={showPrevious} aria-label="Previous slide">
        &#8249;
      </button>
      <button type="button" className="hero-arrow next" onClick={showNext} aria-label="Next slide">
        &#8250;
      </button>

      <div className="hero-dots">
        {slides.map((slide, index) => (
          <button
            key={slide.button}
            type="button"
            className={index === current ? 'active' : ''}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroCarousel;
