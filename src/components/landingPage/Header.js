import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    navBar: {
        height: "70px",
        backgroundColor: theme.palette.primary.main,
        maxWidth: theme.spacing(187.5),
        margin: "0 auto"
    },
    toolbar: {
      height: 70
    },
    title: {
        flexGrow: 1,
    },
    navigation: {
        display: "flex",
        listStyle: "none",
    },
    navLi: {
        padding: theme.spacing(0, 2),
        "&:hover": {
            color: theme.palette.info.main
        }
    }
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.navBar}>
                <Toolbar className={classes.toolbar}>
                    <HomeIcon/>
                    <Typography variant="h5" className={classes.title}>
                        BudgetDomowy
                    </Typography>
                    <Typography>
                        <ul className={classes.navigation}>
                            <li className={classes.navLi}>Przejdź do aplikacji</li>
                            <li className={classes.navLi}>Przejdź do aplikacji</li>
                            <li className={classes.navLi}>O aplikacji</li>
                            <li className={classes.navLi} style={{paddingRight: "0"}}>Kontakt</li>
                        </ul>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}