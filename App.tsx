import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Planner from './pages/Planner';
import Tours from './pages/Tours';
import WorldMap from './pages/WorldMap';
import PlaceDetails from './pages/PlaceDetails';
import Preloader from './components/Preloader';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (slightly longer than the counter to ensure smooth exit)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="min-h-screen text-white font-sans selection:bg-neo-lime selection:text-neo-dark bg-neo-dark">
        <AnimatePresence mode="wait">
          {isLoading && <Preloader />}
        </AnimatePresence>
        
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<WorldMap />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/place/:id" element={<PlaceDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;