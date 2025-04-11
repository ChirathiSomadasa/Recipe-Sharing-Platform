export const localStorageService = {
  // Save the logged-in user to local storage
  saveUser(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  },

  // Retrieve the logged-in user from local storage
  getUser() {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  },

  // Clear the logged-in user from local storage
  clearUser() {
    localStorage.removeItem("currentUser");
  },

  // Find a user by email from the list of registered users
  findUserByEmail(email) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.find((u) => u.email === email);
  },

  // Save favorite recipes (array of recipe IDs) to local storage
  saveFavorites(favoriteIds) {
    localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteIds));
  },

  // Retrieve favorite recipes (array of recipe IDs) from local storage
  getFavorites() {
    const storedFavorites = localStorage.getItem("favoriteRecipes");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  },

  // Clear all favorite recipes from local storage
  clearFavorites() {
    localStorage.removeItem("favoriteRecipes");
  },

  // Add a recipe ID to the list of favorite recipes
  addFavorite(recipeId) {
    const currentFavorites = this.getFavorites();
    if (!currentFavorites.includes(recipeId)) {
      this.saveFavorites([...currentFavorites, recipeId]);
    }
  },

  // Remove a recipe ID from the list of favorite recipes
  removeFavorite(recipeId) {
    const currentFavorites = this.getFavorites();
    this.saveFavorites(currentFavorites.filter((id) => id !== recipeId));
  },
};