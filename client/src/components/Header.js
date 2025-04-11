// Header.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import "./Header.css";

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext); // Access context values

  return (
    <>
      <header className={`header ${theme}`}>
        <div className="header-container">
          {/* Left side - Menu icon, Logo, and name */}
          <div className="header-left">
            <a href="/" className="logo-container">
              <div className="logo">Cooklio</div>
            </a>
          </div>

          {/* Right side - Auth buttons and icons */}
          <div className="header-right">
            <div className="desktop-menu">
              <Link to="/register">
                <button className="primary-button">Sign Up</button>
              </Link>
              <Link to="/login">
                <button className={`text-button-login ${theme}`}>Login</button>
              </Link>
              <button className={`text-button ${theme}`}>Sign Out</button>
              {/* Theme Toggle Icon */}
              <button className="theme-toggle" onClick={toggleTheme}>
                {theme === "light" ? (
                  <span className="material-icons">light_mode</span> // Sun icon for light mode
                ) : (
                  <span className="material-icons">dark_mode</span> // Moon icon for dark mode
                )}
              </button>
            </div>

            {/* Mobile icons */}
            <div className="mobile-menu">
              <Link to="/register">
                <button className="primary-button">Sign Up</button>
              </Link>
              <Link to="/login">
                <button className="text-button-login">Login</button>
              </Link>
              <button className="text-button">Sign Out</button>
              {/* Theme Toggle Icon */}
              <button className="theme-toggle" onClick={toggleTheme}>
                {theme === "light" ? (
                  <span className="material-icons">light_mode</span> // Sun icon for light mode
                ) : (
                  <span className="material-icons">dark_mode</span> // Moon icon for dark mode
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;