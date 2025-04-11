import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchRecipe, updateRecipe } from "../../services/api";
import { ThemeContext } from "../../contexts/ThemeContext"; 
import "./EditRecipeDetails.css";

function EditRecipeDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { theme } = useContext(ThemeContext); // Access context values
  const [recipeData, setRecipeData] = useState({
    title: "",
    description: "",
    cookingTime: "",
    servings: "",
    category: "breakfast",
    image: null,
    imagePreview: null,
  });
  const [ingredients, setIngredients] = useState([{ value: "" }]);
  const [instructions, setInstructions] = useState([{ value: "" }]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [nutrition, setNutrition] = useState({
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    fiber: "",
  });

  // Fetch recipe details on component mount
  useEffect(() => {
    const loadRecipe = async () => {
      try {
        const data = await fetchRecipe(id); // Use the fetchRecipe function from api.js
        setRecipeData({
          title: data.title,
          description: data.description,
          cookingTime: data.cookingTime,
          servings: data.servings,
          category: data.category,
          image: null,
          imagePreview: data.image,
        });
        setIngredients(data.ingredients.map((ingredient) => ({ value: ingredient })));
        setInstructions(data.instructions.map((instruction) => ({ value: instruction })));
        setTags(data.tags);
        setNutrition(data.nutrition);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        alert("Failed to load recipe details. Please try again.");
      }
    };
    loadRecipe();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRecipe = {
      ...recipeData,
      ingredients: ingredients.map((item) => item.value).filter(Boolean),
      instructions: instructions.map((item) => item.value).filter(Boolean),
      tags,
      nutrition,
      updatedAt: new Date().toISOString(),
    };
    try {
      // Use the updateRecipe function from api.js
      const savedRecipe = await updateRecipe(id, updatedRecipe);
      console.log("Recipe updated successfully:", savedRecipe);
      alert("Recipe updated successfully!");
      navigate("/userRecipes");
    } catch (error) {
      console.error("Error updating recipe:", error);
      alert("Failed to update recipe. Please try again.");
    }
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

  // Handle dynamic fields (ingredients, instructions, tags)
  const handleDynamicFieldChange = (setter, index, value) => {
    const updatedFields = [...setter];
    updatedFields[index].value = value;
    setter(updatedFields);
  };

  const addDynamicField = (setter) => setter((prev) => [...prev, { value: "" }]);

  const removeDynamicField = (setter, index) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle tags
  const handleTagInputChange = (e) => setTagInput(e.target.value);

  const addTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => setTags(tags.filter((tag) => tag !== tagToRemove));

  // Handle nutrition input changes
  const handleNutritionChange = (e) => {
    const { name, value } = e.target;
    setNutrition({ ...nutrition, [name]: value });
  };

  return (
    <div className={`bodyER ${theme}`}>
      <div className="add-recipe-container">
        <div className="add-recipe-header">
          <h1>Edit Your Recipe</h1>
          <p>Make changes to your recipe below</p>
        </div>
        <form className="add-recipe-form" onSubmit={handleSubmit}>
          {/* Basic Information Section */}
          <div className="form-section">
            <h2>
              <span className="material-icons">restaurant_menu</span>
              Basic Information
            </h2>
            <div className="formAR-group">
              <label className="lableAR" htmlFor="title">Recipe Title*</label>
              <input
                type="text"
                id="title"
                name="title"
                value={recipeData.title}
                onChange={(e) => setRecipeData({ ...recipeData, title: e.target.value })}
                required
              />
            </div>
            <div className="formAR-group">
              <label className="lableAR" htmlFor="description">Description*</label>
              <textarea
                id="description"
                name="description"
                value={recipeData.description}
                onChange={(e) => setRecipeData({ ...recipeData, description: e.target.value })}
                required
              ></textarea>
            </div>
            <div className="formAR-row">
              <div className="formAR-group">
                <label className="lableAR" htmlFor="cookingTime">Cooking Time*</label>
                <input
                  type="text"
                  id="cookingTime"
                  name="cookingTime"
                  value={recipeData.cookingTime}
                  onChange={(e) => setRecipeData({ ...recipeData, cookingTime: e.target.value })}
                  required
                />
              </div>
              <div className="formAR-group">
                <label className="lableAR" htmlFor="servings">Servings*</label>
                <input
                  type="number"
                  id="servings"
                  name="servings"
                  value={recipeData.servings}
                  onChange={(e) => setRecipeData({ ...recipeData, servings: e.target.value })}
                  required
                />
              </div>
              <div className="formAR-group">
                <label className="lableAR" htmlFor="category">Category*</label>
                <select
                  id="category"
                  name="category"
                  value={recipeData.category}
                  onChange={(e) => setRecipeData({ ...recipeData, category: e.target.value })}
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

          {/* Image Section */}
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
              <span className="material-icons">shopping_cart</span>
              Ingredients
            </h2>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="dynamic-input-row">
                <input
                  type="text"
                  value={ingredient.value}
                  onChange={(e) =>
                    handleDynamicFieldChange(setIngredients, index, e.target.value)
                  }
                  placeholder={`Ingredient ${index + 1}`}
                />
                <button type="button" onClick={() => removeDynamicField(setIngredients, index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addDynamicField(setIngredients)}>
              Add Ingredient
            </button>
          </div>

          {/* Instructions Section */}
          <div className="form-section">
            <h2>
              <span className="material-icons">notes</span>
              Instructions
            </h2>
            {instructions.map((instruction, index) => (
              <div key={index} className="dynamic-input-row">
                <textarea
                  value={instruction.value}
                  onChange={(e) =>
                    handleDynamicFieldChange(setInstructions, index, e.target.value)
                  }
                  placeholder={`Step ${index + 1}`}
                ></textarea>
                <button type="button" onClick={() => removeDynamicField(setInstructions, index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addDynamicField(setInstructions)}>
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
                <span key={index} className="tag">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)}>x</button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={tagInput}
              onChange={handleTagInputChange}
              placeholder="Add a tag"
            />
            <button type="button" onClick={addTag}>
              Add Tag
            </button>
          </div>

          {/* Nutrition Section */}
          <div className="form-section">
            <h2>
              <span className="material-icons">fitness_center</span>
              Nutrition Information
            </h2>
            <div className="formAR-row">
              <input
                type="text"
                name="calories"
                value={nutrition.calories}
                onChange={handleNutritionChange}
                placeholder="Calories"
              />
              <input
                type="text"
                name="protein"
                value={nutrition.protein}
                onChange={handleNutritionChange}
                placeholder="Protein"
              />
              <input
                type="text"
                name="carbs"
                value={nutrition.carbs}
                onChange={handleNutritionChange}
                placeholder="Carbs"
              />
              <input
                type="text"
                name="fat"
                value={nutrition.fat}
                onChange={handleNutritionChange}
                placeholder="Fat"
              />
              <input
                type="text"
                name="fiber"
                value={nutrition.fiber}
                onChange={handleNutritionChange}
                placeholder="Fiber"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="formAR-actions">
            <button type="button" className="cancel-btn" onClick={() => navigate("/")}>
              Cancel
            </button>
            <button type="submit" className="submitAR-btn">
              Update Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditRecipeDetails;