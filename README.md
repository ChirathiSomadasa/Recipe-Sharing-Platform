<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <header>
    <h1>Cooklio: Recipe Sharing Platform</h1>
    <p>A simplified recipe-sharing platform built with React.</p>
  </header>

  <div class="section">
    <h2>Overview</h2>
    <p>
      Cooklio is a recipe-sharing platform where users can browse recipes, save favorites, and contribute their own creations.
      The platform demonstrates modern React workflows, including client-side routing, state management, and API integration.
    </p>
  </div>

  <div class="section">
    <h2>Features</h2>
    <ul>
      <li><strong>Recipe Feed:</strong> Display a grid/list of recipes fetched from a mock API.</li>
      <li><strong>Recipe Details Page:</strong> View detailed information about a recipe, including ingredients, instructions, Nutrition Facts, Tags, Cooking Timer, Social Sharing feature and a "Save to Favorites" button.</li>
      <li><strong>User Authentication (Mock):</strong> Simple login/signup flow with user data stored in local storage.</li>
      <li><strong>CRUD for Recipes:</strong> Add, edit, and delete recipes created by the logged-in user.</li>
      <li><strong>Favorites System:</strong> Save/unsave recipes, persisted using state management or local storage.</li>
    </ul>
    <h3>Optional Features (Bonus)</h3>
    <ul>
      <li><strong>Cooking Timer:</strong> Start a timer based on a recipe's cooking time.</li>
      <li><strong>Ingredient Substitutions:</strong> Suggest alternative ingredients.</li>
      <li><strong>Social Sharing:</strong> Mock functionality to share recipes on social media.</li>
      <li><strong>Advanced Filtering:</strong> Filter recipes by dietary restrictions.</li>
      <li><strong>Dark Mode:</strong> Toggle between light/dark themes using CSS variables.</li>
    </ul>
  </div>

  <div class="section">
    <h2>Technologies Used</h2>
    <ul>
      <li><strong>Frontend Framework:</strong> React.js</li>
      <li><strong>State Management:</strong> Context API </li>
      <li><strong>Routing:</strong> React Router</li>
      <li><strong>Styling:</strong> Material-UI or custom CSS</li>
      <li><strong>Mock API:</strong> <code>json-server</code> for CRUD operations</li>
      <li><strong>Version Control:</strong> Git and GitHub</li>
    </ul>
  </div>

  <div class="section">
    <h2>Setup Instructions</h2>
    <ol>
      <li><strong>Clone the Repository</strong> </li>
      <li><strong>Install Dependencies:</strong>
        <pre>npm install</pre>
      </li>
      <li><strong>Start the Mock API Server:</strong>
        <pre>json-server --watch db.json --port 5000</pre>
      </li>
      <li><strong>Run the Development Server:</strong>
        <pre>npm start</pre>
      </li>
    </ol>
  </div>

  <div class="section">
    <h2>Usage</h2>
    <h3>User Authentication</h3>
    <ul>
      <li><strong>Sign Up:</strong> Navigate to <code>/register</code> to create a new account.</li>
      <li><strong>Log In:</strong> Use the <code>/login</code> page to authenticate with your credentials.</li>
    </ul>
    <h3>Recipe Management</h3>
    <ul>
      <li><strong>Add Recipe:</strong> Click "Add New Recipe" on the <code>/userRecipes</code> page or Click "Add Recipe" on the <code>/ </code> to create a new recipe.</li>
      <li><strong>Edit Recipe:</strong> Use the "Edit" icon on the <code>/userRecipes</code> page to modify an existing recipe.</li>
      <li><strong>Delete Recipe:</strong> Confirm deletion via the "Delete" icon on the <code>/userRecipes</code> page.</li>
    </ul>
    <h3>Favorites System</h3>
    <ul>
      <li>Save recipes to your favorites list by clicking the "Save to Favorites" button on the recipe details page.</li>
      <li>View your saved recipes on the <code>/recipe/:id</code> page.</li>
    </ul>
  </div>

  <div class="section">
    <h2>API Documentation</h2>
    <h3>Endpoints</h3>
    <ul>
      <li><strong>Recipes:</strong>
        <ul>
          <li><code>GET http://localhost:5000/recipes</code></code>: Fetch all recipes.</li>
          <li><code>POST http://localhost:5000/recipes</code>: Add a new recipe.</li>
          <li><code>PUT http://localhost:5000/recipes/:id</code>: Update an existing recipe.</li>
          <li><code>DELETE http://localhost:5000/recipes/:id</code>: Delete a recipe.</li>
        </ul>
      </li>
      <li><strong>Users:</strong>
        <ul>
          <li><code>GET http://localhost:5000/users</code>: Fetch all users.</li>
          <li><code>POST http://localhost:5000/users</code>: Register a new user.</li>
        </ul>
      </li>
    </ul>
  </div>
</body>
</html>
