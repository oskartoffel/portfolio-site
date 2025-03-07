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
  '/ecosystem-simulation': 'portfolio',
  '/behind-works': 'portfolio'
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('home');
  const location = useLocation();
  
  // Function to safely apply theme to body
  const applyThemeToBody = (theme) => {
    // First remove all existing theme classes
    document.body.classList.remove(
      'theme-home', 
      'theme-portfolio', 
      'theme-cv', 
      'theme-coverletter'
    );
    // Then add the current theme class
    document.body.classList.add(`theme-${theme}`);
  };
  
  // Apply theme based on URL immediately when component mounts
  useEffect(() => {
    const path = location.pathname;
    const initialTheme = routeThemeMap[path] || 'home';
    setCurrentTheme(initialTheme);
    applyThemeToBody(initialTheme);
    
    // Add a class to indicate the app is loaded (for CSS transitions)
    document.body.classList.add('theme-loaded');
  }, []);
  
  // Update theme based on current route
  useEffect(() => {
    const path = location.pathname;
    const newTheme = routeThemeMap[path] || 'home';
    setCurrentTheme(newTheme);
    applyThemeToBody(newTheme);
  }, [location]);
  
  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme: (theme) => {
      setCurrentTheme(theme);
      applyThemeToBody(theme);
    }}}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook for components to access theme
export const useTheme = () => useContext(ThemeContext);