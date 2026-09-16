import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Form } from './components/Form';
import { SuccessModal } from './components/SuccessModal';

export const App = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleFormSuccess = (data) => {
    setSubmittedData(data);
  };

  const handleReset = () => {
    setSubmittedData(null);
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <Header theme={theme} toggleTheme={toggleTheme} />

        <section className="hero-section">
          <h1 className="hero-title">Get in Touch</h1>
          <p className="hero-subtitle">
            Fill out the form below with your details. Instant real-time validation will guide you to a complete submission.
          </p>
        </section>

        <Form onSubmitSuccess={handleFormSuccess} />

        {submittedData && (
          <SuccessModal data={submittedData} onReset={handleReset} />
        )}
      </div>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} FlexiForm | Responsive Web Application Portfolio Project</p>
      </footer>
    </div>
  );
};

export default App;
