import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import Login from "./Login";
import Registration from "./Registration";
import Welcome from "./Welcome";
import {HashRouter, NavLink, Route, Switch} from "react-router-dom";
import Header from "./Header";
import {currentUserContext} from "../../index";

const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1,
        width: "100%",
        margin: "0 auto"
    },
    navBar: {
        height: 60,
        backgroundColor: theme.palette.primary.main,
    },
    toolbar: {
        height: 60,
        display: "flex",
        justifyContent: "space-between"
    },
    title: {
        flexGrow: 1,
        fontFamily: "'Courgette', cursive"
    },
    motto : {
        fontFamily: "'Dancing Script', cursive",
    },
    homeLink: {
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        color: theme.palette.primary.contrastText
    }
}));


export default function StartWindow() {
    const classes = useStyles();
    const {currentUser} = useContext(currentUserContext)

    if (currentUser) {
        return (
            <Header/>
        )
    } else {
        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.navBar}>
                    <Toolbar className={classes.toolbar}>
                        <NavLink to="/" className={classes.homeLink}>
                            <HomeIcon/>
                            <Typography variant="h5" className={classes.title}>
                                BudgetDomowy
                            </Typography>
                        </NavLink>
                        <Typography variant="h6" className={classes.motto}>Licz swoje wydatki</Typography>
                    </Toolbar>
                </AppBar>
                <HashRouter>
                    <Switch>
                        <Route exact path="/app/" component={Welcome}/>
                        <Route path="/app/login/" component={Login}/>
                        <Route path="/app/registration/" component={Registration}/>
                    </Switch>
                </HashRouter>
            </div>
        );
    }
};
