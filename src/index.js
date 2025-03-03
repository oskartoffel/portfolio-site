import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'xp.css/dist/XP.css'; // Re-enable this import

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);