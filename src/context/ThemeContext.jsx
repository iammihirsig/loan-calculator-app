import React, { createContext, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const ThemeContext = createContext();

export function ThemeContextProvider({ children }) {
  const [mode, setMode] = useState('light');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                primary: {
                  main: '#1976d2',
                },
                background: {
                  default: '#f5f5f5',
                  paper: '#ffffff',
                },
                text: {
                  primary: '#000000',
                  secondary: '#555555',
                },
              }
            : {
                primary: {
                  main: '#90caf9',
                },
                background: {
                  default: '#121212',
                  paper: '#1d1d1d',
                },
                text: {
                  primary: '#ffffff',
                  secondary: '#bbbbbb',
                },
              }),
        },
        components: {
          MuiTextField: {
            styleOverrides: {
              root: {
                '& .MuiFilledInput-root': {
                  borderRadius: '12px',
                  backgroundColor: mode === 'light' ? '#e8ecef' : '#2a2a2a',
                  '&:hover': {
                    backgroundColor: mode === 'light' ? '#dfe3e6' : '#333333',
                  },
                  '&.Mui-focused': {
                    backgroundColor: mode === 'light' ? '#dfe3e6' : '#333333',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: mode === 'light' ? '#555555' : '#bbbbbb',
                },
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: '12px',
                textTransform: 'none',
                padding: '10px 20px',
              },
              containedPrimary: {
                background: mode === 'light'
                  ? 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)'
                  : 'linear-gradient(45deg, #90caf9 30%, #42a5f5 90%)',
                '&:hover': {
                  background: mode === 'light'
                    ? 'linear-gradient(45deg, #1565c0 30%, #2196f3 90%)'
                    : 'linear-gradient(45deg, #64b5f6 30%, #2196f3 90%)',
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                borderRadius: '16px',
                boxShadow:
                  mode === 'light'
                    ? '0 4px 12px rgba(0, 0, 0, 0.1)'
                    : '0 4px 12px rgba(255, 255, 255, 0.1)',
              },
            },
          },
          MuiTableCell: {
            styleOverrides: {
              head: {
                fontWeight: 'bold',
                backgroundColor: mode === 'light' ? '#e8ecef' : '#2a2a2a',
              },
              body: {
                borderBottom: `1px solid ${
                  mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'
                }`,
              },
            },
          },
        },
        typography: {
          h4: {
            fontWeight: 600,
          },
          h5: {
            fontWeight: 600,
          },
          h6: {
            fontWeight: 500,
          },
          body1: {
            lineHeight: 1.6,
          },
        },
      }),
    [mode]
  );

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
