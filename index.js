import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// src/index.js or src/index.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  shadows: [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.2)', // shadow[1]
    '0px 1px 5px rgba(0, 0, 0, 0.3)', // shadow[2]
    '0px 1px 8px rgba(0, 0, 0, 0.4)', // shadow[3]
  ],
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    // Adding the purple theme
    purple: {
      light: '#d1c4e9',
      main: '#673ab7',
      dark: '#512da8',
      contrastText: '#ffffff',
    },
    // Additional custom colors
    success: {
      main: '#4caf50',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    error: {
      main: '#f44336',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          // Custom styles for AppBar
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 240,
        },
      },
    },
  },
});




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
  <App />
</ThemeProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
