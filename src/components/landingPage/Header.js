import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import {MenuItem, Menu, Button} from "@material-ui/core";
import {Link as LinkDOM} from "react-router-dom";
import { Link } from 'react-scroll';

const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1,
        position: "absolute",
        right: 0,
        left : 0,
        top: 0,
        zIndex: 1
    },
    navBar: {
        minHeight: 60,
        maxHeight: 120,
        backgroundColor: theme.palette.primary.main,
        maxWidth: theme.spacing(187.5),
        width: "100%",
        margin: "0 auto"
    },
    toolbar: {
        minHeight: 60,
        maxHeight: 100,
        display: "flex",
        justifyContent: "space-between"
    },
    title: {
        flexGrow: 1,
        fontFamily: "'Courgette', cursive",
    },
    navigation: {
        display: "none",
        justifyContent: "flex-end",
        listStyle: "none",
        flexWrap: "wrap",
        maxHeight: 120,
        fontFamily: theme.typography.fontFamily,
        [theme.breakpoints.up('md')]: {
            display: "flex"
        },
    },
    navLi: {
        margin: theme.spacing(0, 0, 0, 4),
        textAlign: "right",
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
    mobileMenu: {
        [theme.breakpoints.up('md')]: {
            display: "none"
        },
    },
    menuBtn : {
        color: theme.palette.primary.contrastText,
        fontFamily: theme.typography.fontFamily,
    },
    menuItem: {
        "&:hover": {
            backgroundColor: theme.palette.primary.light
        }
    },
    mobileNavLink: {
        color: theme.palette.text.primary,
        textDecoration: "none",
    }
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div className={classes.root}>
                <AppBar className={classes.navBar}>
                    <Toolbar className={classes.toolbar}>
                        <HomeIcon />
                        <Typography variant="h5" className={classes.title}>
                            BudgetDomowy
                        </Typography>
                            <ul className={classes.navigation}>
                                <li className={classes.navLi} style={{marginLeft: 0}}>
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
                                <li className={classes.navLi} >
                                    <Link to="contact" smooth={true}  duration={500} className={classes.navLink}>
                                        Kontakt
                                    </Link>
                                </li>
                            </ul>
                        <div className={classes.mobileMenu}>
                            <Button
                                id="demo-positioned-button"
                                aria-controls="demo-positioned-menu"
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                className={classes.menuBtn}
                            >
                                MENU
                            </Button>
                            <Menu
                                id="demo-positioned-menu"
                                aria-labelledby="demo-positioned-button"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <MenuItem className={classes.menuItem}>
                                    <LinkDOM to="/app" className={classes.mobileNavLink}>Przejdź do aplikacji</LinkDOM>
                                </MenuItem>
                                <MenuItem className={classes.menuItem}>
                                    <Link to="forWhat" onClick={handleClose} smooth={true} duration={500} className={classes.mobileNavLink}>
                                        Dlaczego warto?
                                    </Link>
                                </MenuItem>
                                <MenuItem className={classes.menuItem}>
                                    <Link to="about" nClick={handleClose} smooth={true}  duration={500} className={classes.mobileNavLink}>
                                        O aplikacji
                                    </Link>
                                </MenuItem>
                                <MenuItem className={classes.menuItem}>
                                    <Link to="contact" onClick={handleClose} smooth={true}  duration={500} className={classes.mobileNavLink}>
                                        Kontakt
                                    </Link>
                                </MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>

        </>
    );
}