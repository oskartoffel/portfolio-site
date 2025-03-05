// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'xp.css/dist/XP.css'; // XP styles
import './styles/theme-variables.css'; // Theme variables
import './styles/theme-body.css'; // Theme body styles
import './styles/enhanced-button.css'; // Enhanced button styles
import './styles/xp-theme.css'; // Your existing XP customizations

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);