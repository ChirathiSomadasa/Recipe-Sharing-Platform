import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { fetchRecipes } from "../../services/api";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./RecipeFeed.css";

function RecipeFeed() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const { theme } = useContext(ThemeContext); // Access context values

  useEffect(() => {
    // Fetch recipes dynamically from the API
    const loadRecipes = async () => {
      try {
        const data = await fetchRecipes();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };
    loadRecipes();
  }, []);

  // Filter recipes based on search term and category filter
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesFilter = activeFilter === "all" || recipe.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading delicious recipes...</p>
      </div>
    );
  }

  return (
    <div className={`bodyRF ${theme}`}>
      <div className={`recipe-feed-container ${theme}`}>
        {/* Hero Banner */}
        <div className="recipe-feed-hero">
          <div className="hero-content">
            <div className="hero-promo">Discover and Share Amazing Recipes Today!</div>
            <h1 className="hero-title">
              Enjoy Your <span className="highlight">Special</span> Delicious Meal
            </h1>
            <p className="hero-description">
              We make it easy for you to share and discover amazing recipes from around the world
            </p>
            <div className="hero-buttons">
              <Link to="/addRecipe" className="hero-button">
                Add Recipe
              </Link>
              <Link to="/userRecipes" className="hero-button hero-button-secondary">
                See My Recipes
              </Link>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="search-filter-container">
          <div className="search-bar">
            <span className="material-icons">search</span>
            <input
              type="text"
              placeholder="Search recipes by name or ingredient..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="filter-tabs">
            <button
              className={`filter-tab ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => handleFilterChange("all")}
            >
              All
            </button>
            <button
              className={`filter-tab ${activeFilter === "breakfast" ? "active" : ""}`}
              onClick={() => handleFilterChange("breakfast")}
            >
              Breakfast
            </button>
            <button
              className={`filter-tab ${activeFilter === "lunch" ? "active" : ""}`}
              onClick={() => handleFilterChange("lunch")}
            >
              Lunch
            </button>
            <button
              className={`filter-tab ${activeFilter === "dinner" ? "active" : ""}`}
              onClick={() => handleFilterChange("dinner")}
            >
              Dinner
            </button>
            <button
              className={`filter-tab ${activeFilter === "dessert" ? "active" : ""}`}
              onClick={() => handleFilterChange("dessert")}
            >
              Dessert
            </button>
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="recipes-grid">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="recipe-card">
                <div className="recipe-card-image">
                  <img
                    src={recipe.image || recipe.imagePreview || "/placeholder.svg?height=200&width=300"}
                    alt={recipe.title}
                  />
                  <div className="recipe-time">
                    <span className="material-icons">schedule</span>
                    {recipe.cookingTime}
                  </div>
                </div>
                <div className="recipe-card-content">
                  <h3 className="recipe-card-title">{recipe.title}</h3>
                  <div className="recipe-card-rating">
                    <span className="material-icons">star</span>
                    <span>{recipe.rating}</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="no-results">
              <span className="material-icons">search_off</span>
              <h3>No recipes found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeFeed;