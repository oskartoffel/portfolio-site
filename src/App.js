// src/App.js
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ui/ThemeProvider';
import Home from './pages/Home';
import CV from './pages/CV';
import CoverLetter from './pages/CoverLetter';
import Portfolio from './pages/Portfolio';
import EcosystemSimulation from './pages/EcosystemSimulation';
import './App.css';
import './styles/fonts.css'; // Import custom fonts

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cv" element={<CV />} />
          <Route path="/cover-letter" element={<CoverLetter />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/ecosystem-simulation" element={<EcosystemSimulation />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;