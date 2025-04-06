import React, { } from "react";
import "./Header.css";
import { Link} from "react-router-dom"; 

function Header() {

  return (
    <>
      <header className="header">
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
                <button className="text-button-login">Login</button>
              </Link>
              <button className="text-button">
                Sign Out
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
              <button className="text-button">
                Sign Out
              </button>
            </div>
          </div>
        </div>

   
      </header>

      
    </>
  );
}

export default Header;