import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext"; 
import { ThemeContext } from "../contexts/ThemeContext";
import "./Header.css";

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext); // Access theme context
  const { user, logout } = useContext(AuthContext); // Access auth context

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
              {/* Conditionally render buttons based on user login status */}
              {user ? (
                // If user is logged in, show Sign Out button
                <>
                  <button className={`text-button ${theme}`} onClick={logout}>
                    Sign Out
                  </button>
                </>
              ) : (
                // If user is not logged in, show Sign Up and Login buttons
                <>
                  <Link to="/register">
                    <button className="primary-button">Sign Up</button>
                  </Link>
                  <Link to="/login">
                    <button className={`text-button-login ${theme}`}>Login</button>
                  </Link>
                </>
              )}

              {/* Theme Toggle Icon */}
              <button className="theme-toggle" onClick={toggleTheme}>
                {theme === "light" ? (
                  <span className="material-icons">light_mode</span> 
                ) : (
                  <span className="material-icons">dark_mode</span> 
                )}
              </button>
            </div>

            {/* Mobile menu (same as desktop menu) */}
            <div className="mobile-menu">
              {user ? (
                // If user is logged in, show Sign Out button
                <>
                  <button className={`text-button ${theme}`} onClick={logout}>
                    Sign Out
                  </button>
                </>
              ) : (
                // If user is not logged in, show Sign Up and Login buttons
                <>
                  <Link to="/register">
                    <button className="primary-button">Sign Up</button>
                  </Link>
                  <Link to="/login">
                    <button className="text-button-login">Login</button>
                  </Link>
                </>
              )}

              {/* Theme Toggle Icon */}
              <button className="theme-toggle" onClick={toggleTheme}>
                {theme === "light" ? (
                  <span className="material-icons">light_mode</span> 
                ) : (
                  <span className="material-icons">dark_mode</span> 
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