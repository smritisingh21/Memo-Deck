import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const SUPPORTED_THEMES = ['light', 'dark', 'emerald', 'corporate', 'retro', 'cyberpunk'];

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const root = window.document.documentElement;
    
    SUPPORTED_THEMES.forEach((t) => {
      root.classList.remove(t);
    });

    root.classList.add(theme);

    root.setAttribute('data-theme', theme);
    
  }, [theme]);

  const value = {
    theme,
    setTheme,
    supportedThemes: SUPPORTED_THEMES,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
    
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;