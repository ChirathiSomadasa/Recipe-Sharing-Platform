import React, { useContext } from "react";
import { Link} from "react-router-dom"
import { ThemeContext } from "../contexts/ThemeContext";
import "./Footer.css"

function Footer() {
   const { theme } = useContext(ThemeContext); // Access theme context 
  const currentYear = new Date().getFullYear()

  return (
    <footer className={`footer ${theme}`}>
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <h2 className="footer-logo">Cookilo</h2>
            <p className="footer-tagline">Share, discover, and cook amazing recipes</p>
            <div className="footer-social">
              <a href="https://facebook.com" className="social-link" aria-label="Facebook">
                <span className="material-icons">facebook</span>
              </a>
              <a href="https://instagram.com" className="social-link" aria-label="Instagram">
                <span className="material-icons">photo_camera</span>
              </a>
              <a
                href="https://wa.me/?text=Check%20out%20this%20amazing%20recipe%20on%20Cookilo!"
                className="social-link"
                aria-label="WhatsApp"
              >
                <span className="material-icons">call</span>
              </a>
              <a href="https://youtube.com" className="social-link" aria-label="YouTube">
                <span className="material-icons">smart_display</span>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-links-column">
              <h3 className="footer-links-title">Explore</h3>
              <ul className="footer-links-list">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/recipes">Recipes</Link>
                </li>
                <li>
                  <Link to="/categories">Categories</Link>
                </li>
                <li>
                  <Link to="/popular">Popular</Link>
                </li>
               
              </ul>
            </div>

            <div className="footer-links-column">
              <h3 className="footer-links-title">Community</h3>
              <ul className="footer-links-list">
                <li>
                  <Link to="/submit-recipe">Submit Recipe</Link>
                </li>
                <li>
                  <Link to="/chefs">Top Chefs</Link>
                </li>
                <li>
                  <Link to="/forums">Forums</Link>
                </li>
                <li>
                  <Link to="/events">Events</Link>
                </li>
              </ul>
            </div>

            <div className="footer-links-column">
              <h3 className="footer-links-title">Company</h3>
              <ul className="footer-links-list">
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-newsletter">
            <h3 className="footer-newsletter-title">Get delicious recipes weekly</h3>
            <p className="footer-newsletter-text">
              Subscribe to our newsletter for new recipes, cooking tips, and exclusive offers.
            </p>
            <form className="footer-newsletter-form">
              <input type="email" placeholder="Your email address" className="footer-newsletter-input" required />
              <button type="submit" className="footer-newsletter-button">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <p className="footer-copyright">&copy; {currentYear} Cookilo. All rights reserved.</p>
            <div className="footer-legal-links">
              <Link to="/terms">Terms of Service</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/cookies">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
