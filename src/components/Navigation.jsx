import React from 'react';
import { FormInput, LayoutDashboard, Send, Sun, Moon, Sparkles } from 'lucide-react';

export const Navigation = ({ activeView, setActiveView, newCount, theme, toggleTheme }) => {
  return (
    <header className="app-header">
      <div className="brand-logo">
        <div className="brand-icon">
          <FormInput size={22} />
        </div>
        <div>
          <h2 className="brand-title">FlexiForm</h2>
          <p className="brand-subtitle">Form Management System</p>
        </div>
      </div>

      {/* Main Navigation View Switcher */}
      <nav className="nav-tabs" aria-label="Main Navigation">
        <button
          className={`nav-tab-btn ${activeView === 'form' ? 'active' : ''}`}
          onClick={() => setActiveView('form')}
        >
          <Send size={16} />
          <span>User Form</span>
        </button>

        <button
          className={`nav-tab-btn ${activeView === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveView('dashboard')}
        >
          <LayoutDashboard size={16} />
          <span>Admin Dashboard</span>
          {newCount > 0 && (
            <span className="badge-pill new-count-badge" title={`${newCount} new submissions`}>
              {newCount}
            </span>
          )}
        </button>
      </nav>

      <div className="header-actions">
        <span className="portfolio-badge">
          <Sparkles size={13} />
          React App
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
