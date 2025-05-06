import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function Home() {
  const { mode } = useContext(ThemeContext);
  return <div>Home Page - Loan Calculator (Mode: {mode})</div>;
}

export default Home;
