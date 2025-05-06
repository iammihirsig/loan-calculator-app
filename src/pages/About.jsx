import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function About() {
  const { mode } = useContext(ThemeContext);
  return <div>About Page (Mode: {mode})</div>;
}

export default About;
