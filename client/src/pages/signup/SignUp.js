import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignUpImage from "../../images/signup.png";
import "./SignUp.css";

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Retrieve existing users or initialize an empty array
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  
    // Create a new user object
    const newUser = {
      id: Date.now().toString(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      mobileNumber: formData.mobileNumber,
      email: formData.email.trim(), 
      password: formData.password,
      favorites: [],
    };
  
    // Add the new user to the existing users array
    existingUsers.push(newUser);
  
    // Save the updated users array back to local storage
    localStorage.setItem("users", JSON.stringify(existingUsers));
  
    console.log("User registered:", newUser);
  
    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <div className="signup-header">
          <h1>Sign Up</h1>
          <p>Create your account to join our recipe-sharing community</p>
        </div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-rowS">
            <div className="form-groupS">
              <label className="labelS" htmlFor="FirstName">
                First Name
              </label>
              <input
                className="inputSU"
                type="text"
                id="FirstName"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-groupS">
              <label className="labelS" htmlFor="LastName">
                Last Name
              </label>
              <input
                className="inputSU"
                type="text"
                id="LastName"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-groupS">
            <label className="labelS" htmlFor="MobileNumber">
              Mobile Number
            </label>
            <input
              className="inputS"
              type="tel"
              id="MobileNumber"
              name="mobileNumber"
              placeholder="Enter your mobile number"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-groupS">
            <label className="labelS" htmlFor="Email">
              Email
            </label>
            <input
              className="inputS"
              type="email"
              id="Email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-groupS">
            <label className="labelS" htmlFor="Password">
              Password
            </label>
            <input
              className="inputS"
              type="password"
              id="Password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <div className="login-link">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Log In
            </Link>
          </p>
        </div>
      </div>
      <div className="signup-image">
        <div className="benefits">
          <h2>Join Our Recipe Sharing Community</h2>
          <ul>
            <li>Discover and share delicious recipes from around the world</li>
            <li>Save your favorite recipes for quick access</li>
            <li>Contribute your own creations and inspire others</li>
            <li>Connect with a community of food enthusiasts</li>
          </ul>
        </div>
        <img src={SignUpImage} alt="recipe-sharing" />
      </div>
    </div>
  );
}

export default SignUp;