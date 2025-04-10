import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Base URL for the mock API
  
// Fetch all recipes
export const fetchRecipes = async () => {
  try {
    const response = await axios.get(`${API_URL}/recipes`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch a specific recipe by ID
export const fetchRecipe = async (recipeId) => {
  try {
    const response = await axios.get(`${API_URL}/recipes/${recipeId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add a new recipe
export const addRecipe = async (newRecipe) => {
  try {
    const response = await axios.post(`${API_URL}/recipes`, newRecipe);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update an existing recipe
export const updateRecipe = async (recipeId, updatedRecipe) => {
  try {
    const response = await axios.put(`${API_URL}/recipes/${recipeId}`, updatedRecipe);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a recipe
export const deleteRecipe = async (recipeId) => {
  try {
    await axios.delete(`${API_URL}/recipes/${recipeId}`);
  } catch (error) {
    throw error;
  }
};
