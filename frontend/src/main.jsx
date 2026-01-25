import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import App from './App.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import './index.css';

// MUI Theme (static)
const muiTheme = createTheme({
  palette: {
    primary: { main: '#667eea', light: '#8093f8', dark: '#5a67d8' },
    secondary: { main: '#a855f7', light: '#c084fc', dark: '#9333ea' },
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    h1: { fontFamily: 'Poppins, system-ui, sans-serif' },
    h2: { fontFamily: 'Poppins, system-ui, sans-serif' },
    h3: { fontFamily: 'Poppins, system-ui, sans-serif' },
    h4: { fontFamily: 'Poppins, system-ui, sans-serif' },
    h5: { fontFamily: 'Poppins, system-ui, sans-serif' },
    h6: { fontFamily: 'Poppins, system-ui, sans-serif' },
  },
  shape: { borderRadius: 12 },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <HelmetProvider>
        <MuiThemeProvider theme={muiTheme}>
          <CssBaseline />
          <ThemeProvider>
            <AuthProvider>
              <App />
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: '#333',
                    color: '#fff',
                    borderRadius: '10px',
                  },
                }}
              />
            </AuthProvider>
          </ThemeProvider>
        </MuiThemeProvider>
      </HelmetProvider>
    </HashRouter>
  </React.StrictMode>
);
