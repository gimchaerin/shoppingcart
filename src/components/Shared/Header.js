import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ theme, toggleTheme }) {
  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list">
          <li>
            <Link to="/" className="nav-link">MAIN</Link>
          </li>
          <li>
            <Link to="/cart" className="nav-link">CART</Link>
          </li>
          <li>
            <button className="theme-toggle-button" onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;