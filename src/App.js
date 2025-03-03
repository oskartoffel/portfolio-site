// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CV from './pages/CV';
import CoverLetter from './pages/CoverLetter';
import Portfolio from './pages/Portfolio';
import EcosystemSimulation from './pages/EcosystemSimulation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/cover-letter" element={<CoverLetter />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/ecosystem-simulation" element={<EcosystemSimulation />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;