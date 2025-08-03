import React from 'react';
import './ThemeToggle.css';
import { FaMoon, FaSun } from 'react-icons/fa';

function ThemeToggle({ toggleTheme, theme }) {
  return (
    <div className="theme-toggle-container">
      <label className="material-switch">
        <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
        <span className="slider">
          <div className="icon sun"><FaSun /></div>
          <div className="icon moon"><FaMoon /></div>
        </span>
      </label>
    </div>
  );
}

export default ThemeToggle;
