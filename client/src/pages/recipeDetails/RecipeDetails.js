import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { fetchRecipe } from "../../services/api";
import { localStorageService } from "../../services/localStorage";
import "./RecipeDetails.css";

function RecipeDetails() {
  const { theme } = useContext(ThemeContext);
  const { id } = useParams(); // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  // Fetch favorite recipes
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    // Load the list of favorite recipes from local storage
    const storedFavorites = localStorageService.getFavorites();
    setIsFavorite(storedFavorites.includes(id));

    // Fetch the recipe details from the API
    const loadRecipe = async () => {
      try {
        setLoading(true);
        const data = await fetchRecipe(id); // Fetch the recipe using the API
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };
    loadRecipe();

    // Fetch favorite recipes
    const loadFavoriteRecipes = async () => {
      const favoriteIds = localStorageService.getFavorites();
      const favoritePromises = favoriteIds.map((favId) => fetchRecipe(favId));
      const favoriteData = await Promise.all(favoritePromises);
      setFavoriteRecipes(favoriteData);
    };
    loadFavoriteRecipes();
  }, [id]);

  const toggleFavorite = () => {
    if (isFavorite) {
      localStorageService.removeFavorite(id); // Remove the recipe from favorites
    } else {
      localStorageService.addFavorite(id); // Add the recipe to favorites
    }
    setIsFavorite(!isFavorite); // Toggle the favorite state
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading recipe...</p>
      </div>
    );
  }

  if (!recipe) {
    return <div className="error-message">Recipe not found</div>;
  }

  return (
    <div className={`bodyRD ${theme}`}>
      <div className="recipe-details-container">
        {/* Hero Section */}
        <div className="recipe-hero">
          <div className="recipe-hero-content">
            <div className="recipe-tags">
              {recipe.tags.map((tag, index) => (
                <span key={index} className="recipe-tag">
                  #{tag}
                </span>
              ))}
            </div>
            <h1 className="recipe-title">{recipe.title}</h1>
            <div className="recipe-meta">
              <div className="recipe-meta-item">
                <span className="material-icons">schedule</span>
                <span>{recipe.cookingTime}</span>
              </div>
              <div className="recipe-meta-item">
                <span className="material-icons">restaurant</span>
                <span>{recipe.servings} servings</span>
              </div>
              <div className="recipe-meta-item">
                <span className="material-icons">star</span>
                <span>{recipe.rating}</span>
              </div>
            </div>
            <p className="recipe-description">{recipe.description}</p>
            <div className="recipe-actions">
              <button
                className={`favorite-button ${isFavorite ? "favorited" : ""}`}
                onClick={toggleFavorite}
              >
                <span className="material-icons">{isFavorite ? "favorite" : "favorite_border"}</span>
                {isFavorite ? "Saved to Favorites" : "Save to Favorites"}
              </button>

              {/* Social Sharing Icons */}
              <div className="social-sharing-icons">
                {/* Share on Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon facebook"
                  title="Share on Facebook"
                >
                  <span className="material-icons">facebook</span>
                </a>
                <p className="social-name">Facebook</p>

                {/* Share on WhatsApp */}
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${recipe.title} - ${window.location.href}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon whatsapp"
                  title="Share on WhatsApp"
                >
                  <span className="material-icons">call</span>
                </a>
                <p className="social-name">WhatsApp</p>

                {/* Share on Instagram */}
                <a
                  href={`https://www.instagram.com/accounts/login/?next=/p/create/captioned/?url=${encodeURIComponent(window.location.href)}&media=${encodeURIComponent(recipe.image)}&caption=${encodeURIComponent(recipe.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon instagram"
                  title="Share on Instagram"
                >
                  <span className="material-icons">camera_alt</span>
                </a>
                <p className="social-name">Instagram</p>
              </div>
            </div>
          </div>
          <div className="recipe-hero-image">
            <img src={recipe.image || recipe.imagePreview || "/placeholder.svg"} />
            <div className="recipe-author">
              <span className="material-icons">person</span>
              <span>Recipe by {recipe.author}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="recipe-main-content">
          <div className="recipe-ingredients-section">
            <h2>
              <span className="material-icons">shopping_basket</span>
              Ingredients
            </h2>
            <ul className="ingredients-list">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="ingredient-item">
                  <span className="material-icons check-icon">check_circle_outline</span>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
            <div className="nutrition-facts">
              <h3>Nutrition Facts</h3>
              <div className="nutrition-grid">
                <div className="nutrition-item">
                  <span className="nutrition-value">{recipe.nutrition.calories}</span>
                  <span className="nutrition-label">Calories</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-value">{recipe.nutrition.protein}</span>
                  <span className="nutrition-label">Protein</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-value">{recipe.nutrition.carbs}</span>
                  <span className="nutrition-label">Carbs</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-value">{recipe.nutrition.fat}</span>
                  <span className="nutrition-label">Fat</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-value">{recipe.nutrition.fiber}</span>
                  <span className="nutrition-label">Fiber</span>
                </div>
              </div>
            </div>
          </div>
          <div className="recipe-instructions-section">
            <h2>
              <span className="material-icons">menu_book</span>
              Instructions
            </h2>
            <ol className="instructions-list">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="instruction-item">
                  <div className="instruction-number">{index + 1}</div>
                  <div className="instruction-text">{instruction}</div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Favorite Recipes Section */}
        {favoriteRecipes.length > 0 && (
          <div className="favorite-recipes-section">
            <h2>Your Favorite Recipes</h2>
            <div className="favorite-recipes-grid">
              {favoriteRecipes.map((favoriteRecipe) => (
                <div key={favoriteRecipe.id} className="favorite-recipe-card">
                  <div className="favorite-recipe-image">
                    <img
                      src={favoriteRecipe.image || favoriteRecipe.imagePreview || "/placeholder.svg"}
                      alt={favoriteRecipe.title}
                    />
                  </div>
                  <div className="favorite-recipe-content">
                    <h3>{favoriteRecipe.title}</h3>
                    <div className="favorite-recipe-meta">
                      <span>
                        <span className="material-icons">schedule</span>
                        {favoriteRecipe.cookingTime}
                      </span>
                      <span>
                        <span className="material-icons">star</span>
                        {favoriteRecipe.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeDetails;