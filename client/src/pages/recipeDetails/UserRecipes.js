import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchRecipes, deleteRecipe } from "../../services/api"; 
import "./UserRecipes.css";

function UserRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("title");

  // Fetch recipes using the API
  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await fetchRecipes(); // Use the fetchRecipes function from api.js
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  // Filter and sort recipes
  const filteredRecipes = recipes
    .filter((recipe) => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === "all" || recipe.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "category") return a.category.localeCompare(b.category);
      if (sortBy === "cookingTime") {
        const getMinutes = (timeStr) => {
          const match = timeStr.match(/(\d+)/);
          return match ? Number.parseInt(match[1]) : 0;
        };
        return getMinutes(a.cookingTime) - getMinutes(b.cookingTime);
      }
      return 0;
    });

  // Handle delete logic
  const handleDeleteRecipe = async (id) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        await deleteRecipe(id); // Use the deleteRecipe function from api.js
        setRecipes(recipes.filter((recipe) => recipe.id !== id)); // Update the state after deletion
      } catch (error) {
        console.error("Error deleting recipe:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="user-recipes-loading">
        <div className="loading-spinner"></div>
        <p>Loading your recipes...</p>
      </div>
    );
  }

  return (
    <div className="user-recipes-container">
      <div className="user-recipes-header">
        <h1>My Recipes</h1>
        <Link to="/addRecipe" className="add-recipe-button">
          <span className="material-icons">add</span>
          Add New Recipe
        </Link>
      </div>

      <div className="user-recipes-controls">
        <div className="search-filter">
          <div className="search-bar">
            <span className="material-icons">search</span>
            <input
              type="text"
              placeholder="Search your recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-sort-controls">
            <div className="filter-control">
              <label htmlFor="category-filter">Category:</label>
              <select
                id="category-filter"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="dessert">Dessert</option>
                <option value="snack">Snack</option>
                <option value="beverage">Beverage</option>
              </select>
            </div>
            <div className="sort-control">
              <label htmlFor="sort-by">Sort by:</label>
              <select id="sort-by" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="title">Title (A-Z)</option>
                <option value="category">Category</option>
                <option value="cookingTime">Cooking Time</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {filteredRecipes.length > 0 ? (
        <div className="recipes-table-container">
          <table className="recipes-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Cooking Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecipes.map((recipe) => (
                <tr key={recipe.id}>
                  <td className="recipe-title-cell">
                    <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                  </td>
                  <td>
                    <span className={`category-badge ${recipe.category}`}>{recipe.category}</span>
                  </td>
                  <td>{recipe.cookingTime}</td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`/editRecipe/${recipe.id}`} className="action-button edit">
                        <span className="material-icons">edit</span>
                      </Link>
                      <button
                        className="action-button delete"
                        onClick={() => handleDeleteRecipe(recipe.id)}
                      >
                        <span className="material-icons">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-recipes">
          <span className="material-icons">restaurant_menu</span>
          <h3>No recipes found</h3>
          <p>
            {searchTerm || filterCategory !== "all"
              ? "Try adjusting your search or filter criteria"
              : "You haven't added any recipes yet. Click 'Add New Recipe' to get started!"}
          </p>
        </div>
      )}
    </div>
  );
}

export default UserRecipes;