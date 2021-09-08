import React from 'react';
import ReactDOM from 'react-dom';
import "reset-css";
import LandingPage from "./components/LandingPage";
import App from "./App";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

export const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#18d390',
            contrastText: 'rgba(255,255,255,0.87)',
        },
        secondary: {
            main: '#00A3FF',
            contrastText: 'rgba(255,255,255,0.87)',
        },
        text: {
            primary: 'rgba(0,0,0,0.87)',
        },
        info: {
            main: '#0044F4',
        },
    },
    typography: {
        fontFamily: 'Open Sans',
    },
    shape: {
        borderRadius: 20,
    },
});


const Index = () => {
    return (
        <App />
    )
}

ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <Index />
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

