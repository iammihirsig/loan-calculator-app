import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeContextProvider } from './context/ThemeContext';
import { fetchExchangeRates } from './services/api';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Error from './pages/Error';
import Rates from './pages/Rates';

export const CurrencyContext = createContext();

function App() {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState({ USD: 1 });

  const refreshExchangeRates = async () => {
    console.log('Refreshing exchange rates...');
    const rates = await fetchExchangeRates();
    if (rates) {
      console.log('Updated exchange rates:', rates);
      setExchangeRates(rates);
    } else {
      console.error('Failed to fetch exchange rates. Using default rates.');
      setExchangeRates({ USD: 1 });
    }
  };

  useEffect(() => {
    refreshExchangeRates();
  }, []);

  return (
    <ThemeContextProvider>
      <CurrencyContext.Provider value={{ selectedCurrency, setSelectedCurrency, exchangeRates, refreshExchangeRates }}>
        <Router>
          <ErrorBoundary>
            <Header />
            <Routes>
              <Route path="/loan-calculator-app/home" element={<Home />} />
              <Route path="/loan-calculator-app/about" element={<About />} />
              <Route path="/loan-calculator-app/error" element={<Error />} />
              <Route path="/loan-calculator-app/rates" element={<Rates />} />
              {/* Wildcard fallback for any invalid path under the base */}
              <Route path="/loan-calculator-app/*" element={<Error />} />
            </Routes>
          </ErrorBoundary>
        </Router>
      </CurrencyContext.Provider>
    </ThemeContextProvider>
  );
}

export default App;
