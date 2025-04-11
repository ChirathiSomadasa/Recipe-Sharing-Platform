import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { addRecipe } from "../../services/api";
import { ThemeContext } from "../../contexts/ThemeContext"; 
import { AuthContext } from "../../contexts/AuthContext";  
import "./AddRecipeDetails.css";

function AddRecipeDetails() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext); // Access context values
  const { user } = useContext(AuthContext); // Access the logged-in userF
  // State for form fields
  const [recipeData, setRecipeData] = useState({
    title: "",
    description: "",
    cookingTime: "",
    servings: "",
    category: "breakfast",
    image: "", // Store the image URL
    imagePreview: null,
  });

  // State for dynamic fields (ingredients and instructions)
  const [ingredients, setIngredients] = useState([{ value: "" }]);
  const [instructions, setInstructions] = useState([{ value: "" }]);

  // State for tags
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  // State for nutrition info
  const [nutrition, setNutrition] = useState({
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    fiber: "",
  });

  // Generate a unique ID for the recipe
  const generateUniqueId = () => `R${Date.now()}`;

  // Handle basic input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({ ...recipeData, [name]: value });
  };

  // Handle nutrition input changes
  const handleNutritionChange = (e) => {
    const { name, value } = e.target;
    setNutrition({ ...nutrition, [name]: value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRecipeData({
        ...recipeData,
        image: URL.createObjectURL(file), // Store the image URL for local preview
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  // Handle ingredients
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index].value = value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { value: "" }]);
  };

  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      const newIngredients = [...ingredients];
      newIngredients.splice(index, 1);
      setIngredients(newIngredients);
    }
  };

  // Handle instructions
  const handleInstructionChange = (index, value) => {
    const newInstructions = [...instructions];
    newInstructions[index].value = value;
    setInstructions(newInstructions);
  };

  const addInstruction = () => {
    setInstructions([...instructions, { value: "" }]);
  };

  const removeInstruction = (index) => {
    if (instructions.length > 1) {
      const newInstructions = [...instructions];
      newInstructions.splice(index, 1);
      setInstructions(newInstructions);
    }
  };

  // Handle tags
  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const addTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newRecipe = {
      id: generateUniqueId(),
      ...recipeData,
      ingredients: ingredients.map((item) => item.value).filter((value) => value.trim() !== ""),
      instructions: instructions.map((item) => item.value).filter((value) => value.trim() !== ""),
      tags,
      nutrition,
      createdAt: new Date().toISOString(),
    };

    try {
      await addRecipe(newRecipe, user.id); // Pass the user's ID
      console.log("Recipe added successfully:", newRecipe);
      alert("Recipe added successfully!");
      navigate("/userRecipes");
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert("Failed to add recipe. Please try again.");
    }
  };


  // Form validation
  const validateForm = () => {
    if (
      !recipeData.title ||
      !recipeData.description ||
      !recipeData.cookingTime ||
      !recipeData.servings
    ) {
      alert("Please fill in all required fields.");
      return false;
    }

    if (isNaN(recipeData.servings)) {
      alert("Servings must be a number.");
      return false;
    }

    if (ingredients.every((item) => item.value.trim() === "")) {
      alert("Please add at least one ingredient.");
      return false;
    }

    if (instructions.every((item) => item.value.trim() === "")) {
      alert("Please add at least one instruction step.");
      return false;
    }

    return true;
  };

  return (
    <div className={`bodyAR ${theme}`}>
      <div className="add-recipe-container">
        <div className="add-recipe-header">
          <h1>Share Your Recipe</h1>
          <p>Fill in the details below to share your delicious recipe with the world</p>
        </div>
        <form className="add-recipe-form" onSubmit={handleSubmit}>
          {/* Basic Information Section */}
          <div className="form-section">
            <h2>
              <span className="material-icons">restaurant_menu</span>
              Basic Information
            </h2>
            <div className="formAR-group">
              <label className="lableAR" htmlFor="title">
                Recipe Title*
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={recipeData.title}
                onChange={handleInputChange}
                placeholder="E.g., Homemade Chocolate Chip Cookies"
                required
              />
            </div>
            <div className="formAR-group">
              <label className="lableAR" htmlFor="description">
                Description*
              </label>
              <textarea
                id="description"
                name="description"
                value={recipeData.description}
                onChange={handleInputChange}
                placeholder="Describe your recipe in a few sentences..."
                required
              ></textarea>
            </div>
            <div className="formAR-row">
              <div className="formAR-group">
                <label className="lableAR" htmlFor="cookingTime">
                  Cooking Time*
                </label>
                <input
                  type="text"
                  id="cookingTime"
                  name="cookingTime"
                  value={recipeData.cookingTime}
                  onChange={handleInputChange}
                  placeholder="E.g., 30 mins"
                  required
                />
              </div>
              <div className="formAR-group">
                <label className="lableAR" htmlFor="servings">
                  Servings*
                </label>
                <input
                  type="number"
                  id="servings"
                  name="servings"
                  value={recipeData.servings}
                  onChange={handleInputChange}
                  placeholder="E.g., 4"
                  min="1"
                  required
                />
              </div>
              <div className="formAR-group">
                <label className="lableAR" htmlFor="category">
                  Category*
                </label>
                <select
                  id="category"
                  name="category"
                  value={recipeData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="dessert">Dessert</option>
                  <option value="snack">Snack</option>
                  <option value="beverage">Beverage</option>
                </select>
              </div>
            </div>
          </div>

          {/* Recipe Image Section */}
          <div className="form-section">
            <h2>
              <span className="material-icons">image</span>
              Recipe Image
            </h2>
            <div className="image-upload-container">
              <div className="image-upload-area">
                {recipeData.imagePreview ? (
                  <div className="image-preview">
                    <img src={recipeData.imagePreview} alt="Recipe preview" />
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={() =>
                        setRecipeData({ ...recipeData, image: "", imagePreview: null })
                      }
                    >
                      <span className="material-icons">delete</span>
                    </button>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <span className="material-icons">cloud_upload</span>
                    <p>Drag & drop an image or click to browse</p>
                    <small>Recommended size: 1200 x 800 pixels, max 5MB</small>
                  </div>
                )}
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input"
                />
              </div>
            </div>
          </div>

          {/* Ingredients Section */}
          <div className="form-section">
            <h2>
              <span className="material-icons">shopping_basket</span>
              Ingredients
            </h2>
            {ingredients.map((ingredient, index) => (
              <div className="dynamic-input-row" key={index}>
                <input
                  type="text"
                  value={ingredient.value}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  placeholder={`Ingredient ${index + 1}, e.g., 2 cups flour`}
                />
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeIngredient(index)}
                  disabled={ingredients.length === 1}
                >
                  <span className="material-icons">remove_circle_outline</span>
                </button>
              </div>
            ))}
            <button type="button" className="add-btn" onClick={addIngredient}>
              <span className="material-icons">add_circle_outline</span>
              Add Ingredient
            </button>
          </div>

          {/* Instructions Section */}
          <div className="form-section">
            <h2>
              <span className="material-icons">menu_book</span>
              Instructions
            </h2>
            {instructions.map((instruction, index) => (
              <div className="dynamic-input-row" key={index}>
                <div className="instruction-number">{index + 1}</div>
                <textarea
                  value={instruction.value}
                  onChange={(e) => handleInstructionChange(index, e.target.value)}
                  placeholder={`Step ${index + 1}, e.g., Mix the dry ingredients in a large bowl`}
                ></textarea>
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeInstruction(index)}
                  disabled={instructions.length === 1}
                >
                  <span className="material-icons">remove_circle_outline</span>
                </button>
              </div>
            ))}
            <button type="button" className="add-btn" onClick={addInstruction}>
              <span className="material-icons">add_circle_outline</span>
              Add Step
            </button>
          </div>

          {/* Tags Section */}
          <div className="form-section">
            <h2>
              <span className="material-icons">local_offer</span>
              Tags
            </h2>
            <div className="tags-container">
              {tags.map((tag, index) => (
                <div className="tag" key={index}>
                  <span>#{tag}</span>
                  <button type="button" onClick={() => removeTag(tag)}>
                    <span className="material-icons">close</span>
                  </button>
                </div>
              ))}
            </div>
            <div className="tag-input-container">
              <input
                type="text"
                value={tagInput}
                onChange={handleTagInputChange}
                placeholder="Add a tag (e.g., vegan, quick, italian)"
              />
              <button type="button" onClick={addTag}>
                Add
              </button>
            </div>
          </div>

          {/* Nutrition Information Section */}
          <div className="form-section">
            <h2>
              <span className="material-icons">monitor_weight</span>
              Nutrition Information (Optional)
            </h2>
            <div className="formAR-row">
              <div className="formAR-group">
                <label className="lableAR" htmlFor="calories">
                  Calories
                </label>
                <input
                  type="text"
                  id="calories"
                  name="calories"
                  value={nutrition.calories}
                  onChange={handleNutritionChange}
                  placeholder="E.g., 250"
                />
              </div>
              <div className="formAR-group">
                <label className="lableAR" htmlFor="protein">
                  Protein
                </label>
                <input
                  type="text"
                  id="protein"
                  name="protein"
                  value={nutrition.protein}
                  onChange={handleNutritionChange}
                  placeholder="E.g., 10g"
                />
              </div>
              <div className="formAR-group">
                <label className="lableAR" htmlFor="carbs">
                  Carbs
                </label>
                <input
                  type="text"
                  id="carbs"
                  name="carbs"
                  value={nutrition.carbs}
                  onChange={handleNutritionChange}
                  placeholder="E.g., 30g"
                />
              </div>
              <div className="formAR-group">
                <label className="lableAR" htmlFor="fat">
                  Fat
                </label>
                <input
                  type="text"
                  id="fat"
                  name="fat"
                  value={nutrition.fat}
                  onChange={handleNutritionChange}
                  placeholder="E.g., 12g"
                />
              </div>
              <div className="formAR-group">
                <label className="lableAR" htmlFor="fiber">
                  Fiber
                </label>
                <input
                  type="text"
                  id="fiber"
                  name="fiber"
                  value={nutrition.fiber}
                  onChange={handleNutritionChange}
                  placeholder="E.g., 3g"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="formAR-actions">
            <button type="button" className="cancel-btn" onClick={() => navigate("/")}>
              Cancel
            </button>
            <button type="submit" className="submitAR-btn">
              <span className="material-icons">publish</span>
              Publish Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRecipeDetails;