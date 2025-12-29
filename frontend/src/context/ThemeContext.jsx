import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();


export const ThemeProvider = ({ children }) => {
  
   const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('memo-deck-theme');
    return savedTheme || 'dark'; 
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add(theme);
    root.className = theme;

    localStorage.setItem('memo-deck-theme', theme);
    root.setAttribute('data-theme', theme);
  }, [theme]);

  const value = {
    theme,
    setTheme,
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