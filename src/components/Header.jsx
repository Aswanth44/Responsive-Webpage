import React from 'react';
import { FormInput, Sun, Moon, Sparkles } from 'lucide-react';

export const Header = ({ theme, toggleTheme }) => {
  return (
    <header className="app-header">
      <div className="brand-logo">
        <div className="brand-icon">
          <FormInput size={22} />
        </div>
        <div>
          <h2 className="brand-title">FlexiForm</h2>
          <p className="brand-subtitle">Smart Responsive Form</p>
        </div>
      </div>

      <div className="header-actions">
        <span className="portfolio-badge">
          <Sparkles size={13} />
          Portfolio Project
        </span>
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </header>
  );
};
