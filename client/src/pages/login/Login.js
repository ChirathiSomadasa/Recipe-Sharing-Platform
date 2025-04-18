import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { AuthContext } from '../../contexts/AuthContext'; 
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Access the login function from AuthContext
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Clear error when user starts typing
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the login function from AuthContext
      await login(formData.email, formData.password);

      console.log("User logged in successfully");

      // Redirect to the home page after successful login
      navigate("/");
    } catch (err) {
      // Handle invalid credentials or other errors
      setError(err.message || "Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="welcome-container">
        <h1 className="welcome-heading">Welcome Back!</h1>
        <p className="welcome-message">
          Please enter your details to access your account
        </p>
      </div>

      <div className="login-modal">
        <div className="login-header">
          <h2>Login</h2>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-groupL">
            <label className="labelL" htmlFor="email">
              Email
            </label>
            <input
              className="inputL"
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email or phone"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group password-group">
            <label className="labelL" htmlFor="password">
              Password
            </label>
            <div className="password-input-container">
              <input
                className="inputL"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div className="signup-prompt">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="signup-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;