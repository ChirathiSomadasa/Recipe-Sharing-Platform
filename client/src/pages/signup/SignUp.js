import "./SignUp.css";
import SignUpImage from "../../images/signup.png";
import { Link } from "react-router-dom";

function SignUp() {

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <div className="signup-header">
          <h1>Sign Up</h1>
          <p>Create your account to order delicious food</p>
        </div>
        <form className="signup-form">
          <div className="form-rowS">
            <div className="form-groupS">
              <label className="labelS" htmlFor="FirstName">
                First Name
              </label>
              <input
                className="inputSU"
                type="text"
                id="FirstName"
                name="FirstName"
                placeholder="Enter your first name"
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
                name="LastName"
                placeholder="Enter your last name"
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
              name="MobileNumber"
              placeholder="Enter your mobile number"
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
              name="Email"
              placeholder="Enter your email address"
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
              name="Password"
              placeholder="Enter your password"
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