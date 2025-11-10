import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App.jsx'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';


// Tema Material-UI inspirado en Liquid Glass de Apple
const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(0, 122, 255, 0.8)',
      light: 'rgba(0, 122, 255, 0.6)',
      dark: 'rgba(0, 122, 255, 0.9)',
    },
    background: {
      default: 'rgba(248, 248, 248, 0.8)',
      paper: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: '"SF Pro Display", "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backdropFilter: 'blur(20px)',
          background: 'linear-gradient(135deg, rgba(248,248,248,0.9) 0%, rgba(240,240,240,0.9) 100%)',
        },
      },
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)