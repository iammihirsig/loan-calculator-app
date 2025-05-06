import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function Error() {
  const { mode } = useContext(ThemeContext);
  return <div>Error Page - 404 Not Found (Mode: {mode})</div>;
}

export default Error;
