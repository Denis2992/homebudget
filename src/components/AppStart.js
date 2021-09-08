import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import {Button, Paper, Box, Divider} from "@material-ui/core";
import AppLogin from "./app/AppLogin";
import AppRegistration from "./app/AppRegistration";
import AppWelcome from "./app/AppWelcome";

const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1,
        maxWidth: theme.spacing(187.5),
        width: "100%",
        margin: "0 auto"
    },
    navBar: {
        height: 60,
        backgroundColor: theme.palette.primary.main,
    },
    toolbar: {
        height: 60
    },
    title: {
        flexGrow: 1,
        fontFamily: "'Courgette', cursive"
    },
    motto : {
        fontFamily: "'Dancing Script', cursive",
    },


}));

export default function AppStart() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.navBar}>
                <Toolbar className={classes.toolbar}>
                    <HomeIcon />
                    <Typography variant="h5" className={classes.title}>
                        BudgetDomowy
                    </Typography>
                    <Typography variant="h6" className={classes.motto}>Licz swoje wydatki</Typography>
                </Toolbar>
            </AppBar>
            <AppWelcome />
            <AppLogin />
            <AppRegistration />
        </div>
    );
}