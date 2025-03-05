// src/components/ui/ThemeProvider.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Create theme context
const ThemeContext = createContext({
  currentTheme: 'home',
  setTheme: () => {},
});

// Theme mapping based on route paths
const routeThemeMap = {
  '/': 'home',
  '/cv': 'cv',
  '/cover-letter': 'coverletter',
  '/portfolio': 'portfolio',
  '/ecosystem-simulation': 'portfolio'
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('home');
  const location = useLocation();
  
  // Update theme based on current route
  useEffect(() => {
    const path = location.pathname;
    const newTheme = routeThemeMap[path] || 'home';
    setCurrentTheme(newTheme);
  }, [location]);
  
  // Apply theme class to body element
  useEffect(() => {
    // Remove any existing theme classes
    document.body.classList.remove('theme-home', 'theme-portfolio', 'theme-cv', 'theme-coverletter');
    // Add current theme class
    document.body.classList.add(`theme-${currentTheme}`);
  }, [currentTheme]);
  
  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme: setCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook for components to access theme
export const useTheme = () => useContext(ThemeContext);