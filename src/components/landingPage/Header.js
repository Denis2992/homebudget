import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import {Link as LinkDOM} from "react-router-dom";
import { Link } from 'react-scroll';

const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1,
        position: "fixed",
        right: 0,
        left : 0,
        top: 0,
        bottom: 0,
        zIndex: 3
    },
    navBar: {
        height: 60,
        backgroundColor: theme.palette.primary.main,
        maxWidth: theme.spacing(187.5),
        width: "100%",
        margin: "0 auto"
    },
    toolbar: {
      height: 60
    },
    title: {
        flexGrow: 1,
        fontFamily: "'Courgette', cursive",
    },
    navigation: {
        display: "flex",
        listStyle: "none",
    },
    navLi: {
        padding: theme.spacing(0, 2),
        "&:hover": {
            color: theme.palette.info.main,
        }
    },
    navLink: {
        textDecoration: "none",
        color: theme.palette.primary.contrastText,
        "&:hover": {
            color: theme.palette.info.main,
        },
        cursor: "pointer"
    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <>
            <div className={classes.root}>
                <AppBar position="static" className={classes.navBar}>
                    <Toolbar className={classes.toolbar}>
                        <HomeIcon />
                        <Typography variant="h5" className={classes.title}>
                            BudgetDomowy
                        </Typography>
                        <Typography>
                            <ul className={classes.navigation}>
                                <li className={classes.navLi}>
                                    <LinkDOM to="/app" className={classes.navLink}>Przejdź do aplikacji</LinkDOM>
                                </li>
                                <li className={classes.navLi}>
                                    <Link to="forWhat" smooth={true}  duration={500} className={classes.navLink}>
                                        Dlaczego warto?
                                    </Link>
                                </li>
                                <li className={classes.navLi}>
                                    <Link to="about" smooth={true}  duration={500} className={classes.navLink}>
                                        O aplikacji
                                    </Link>
                                </li>
                                <li className={classes.navLi} style={{paddingRight: "0"}}>
                                    <Link to="contact" smooth={true}  duration={500} className={classes.navLink}>
                                        Kontakt
                                    </Link>
                                </li>
                            </ul>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>

        </>
    );
}