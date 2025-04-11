import './App.css';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Header from "./components/Header";
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";
import RecipeDetails from "./pages/recipeDetails/RecipeDetails";
import RecipeFeed from "./pages/recipeFeed/RecipeFeed";
import AddRecipeDetails from "./pages/recipeDetails/AddRecipeDetails";
import UserRecipes from "./pages/recipeDetails/UserRecipes";
import EditRecipeDetails from "./pages/recipeDetails/EditRecipeDetails";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
      <Route path="/register" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recipe/:id" element={<RecipeDetails />} />
      <Route path="/" element={<RecipeFeed />} />
      <Route path="/addRecipe" element={<AddRecipeDetails />} />
      <Route path="/userRecipes" element={<UserRecipes />} />
      <Route path="/editRecipe/:id" element={<EditRecipeDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
