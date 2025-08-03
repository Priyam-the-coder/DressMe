import React from 'react';
import './Navbar.css';
import ThemeToggle from './ThemeToggle';

function Navbar({ toggleTheme, theme }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logo512.png" alt="Dress Me" width="500" />
        <h1 style={{
          fontFamily: 'Great Vibes, cursive',
          fontSize: '48px',
          color: '#f0efef',
          margin: 0
        }}>
          DressMe
        </h1>
      </div>

      <div className="navbar-toggle">
        <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
      </div>
    </nav>
  );
}

export default Navbar;
