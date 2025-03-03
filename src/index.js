import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'xp.css/dist/XP.css'; // Import XP.css
import './styles/xp-theme.css'; // Import your customizations

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);