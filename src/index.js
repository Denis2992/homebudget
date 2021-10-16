import React, {createContext, useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import "reset-css";
import {HashRouter, Route, Switch} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import App from "./App";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import getFirebase from "./components/firebase/firebase";

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

export const CurrentUserContext = createContext(null);

const Index = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const firebase = getFirebase();

        if (firebase) {
            firebase.auth().onAuthStateChanged((authUser) => {
                if (authUser) {
                    setCurrentUser(authUser.email);
                } else {
                    setCurrentUser(null);
                }
            });
        }
    }, []);

    return (
        <CurrentUserContext.Provider value={{
            currentUser, setCurrentUser
        }}>
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route path="/app" component={App} />
                </Switch>
            </HashRouter>
        </CurrentUserContext.Provider>

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

