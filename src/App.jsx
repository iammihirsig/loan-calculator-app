import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeContextProvider } from './context/ThemeContext';
import Home from './pages/Home';
import About from './pages/About';
import Error from './pages/Error';

function App() {
  return (
    <ThemeContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </ThemeContextProvider>
  );
}

export default App;
