import React, {useContext, useEffect, useState} from 'react';
import clsx from 'clsx';
import {
    makeStyles,
    withStyles,
    useTheme,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    ListItem,
    Box,
    Avatar,
    Tooltip
} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from "@material-ui/icons/Home";
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import {HashRouter, Link, NavLink, Route, Switch} from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import StartWindow from "./StartWindow";
import CreditCalculator from "./CreditCalculator";
import Notes from "./Notes";
import Pulpit from "./Pulpit";
import Budget from "./Budget";
import {usersDataContext} from "../../App";



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        maxWidth: theme.spacing(162.5),

    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    headerToolBar: {
        display: "flex",
        justifyContent: "space-between"
    },
    headerToolBarBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    headerToolBarBoxLogoText: {
        fontFamily: "'Courgette', cursive",
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        alignItems: "center",
        justifyContent: "center",
        margin: 0,
        padding: 0
    },
    avatar: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.info.light,
        marginRight: theme.spacing(2)

    },
    userBox : {
        display: "flex",
        alignItems: "center"
    },
    homeLink: {
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        color: theme.palette.primary.contrastText
    },
    exitBtn: {
        color: theme.palette.primary.contrastText,
        marginTop: theme.spacing(0.8)
    },
    list: {
        margin: theme.spacing(3, 1)
    },
    navLink: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: theme.palette.text.secondary,
        textDecoration: "none",
        fontSize: 20,
        padding: theme.spacing(1.5, 0)

    },
    navLinkIcon: {
        marginRight: theme.spacing(3.5)
    }
}));

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.contrastText,
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}))(Tooltip);

export default function Header() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const {setCurrentUserData, usersData} = useContext(usersDataContext);

    useEffect(() => {
        setCurrentUserData(usersData.find(user => user.login === localStorage.userName));
    });


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleExitApp = () => {
        localStorage.clear();
        setCurrentUserData([]);
    };

    if (localStorage.userName && localStorage.userPassword) {
        return (
            <div className={classes.root}>
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar className={classes.headerToolBar}>
                        <Box className={classes.headerToolBarBox}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, {
                                    [classes.hide]: open,
                                })}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Link to="/" className={classes.homeLink}>
                                <HomeIcon />
                                <Typography variant="h5" noWrap className={classes.headerToolBarBoxLogoText}>
                                    BudgetDomowy
                                </Typography>
                            </Link>
                        </Box>
                        <Box className={classes.userBox}>
                            <Avatar className={classes.avatar}>{localStorage.userName[0].toUpperCase()}</Avatar>
                            <Typography>{localStorage.userName}</Typography>
                            <LightTooltip title="Wyjdź">
                                <IconButton aria-label="exit" onClick={handleExitApp}>
                                    <Link to="/app">
                                        <ExitToAppIcon className={classes.exitBtn}/>
                                    </Link>
                                </IconButton>
                            </LightTooltip>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                >
                    <div className={classes.toolbar}>
                        <Typography>Menu</Typography>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List className={classes.list}>
                        <ListItem button >
                            <NavLink exact to="/app/"
                                     className={classes.navLink}
                                     activeStyle={{color: theme.palette.info.light}}

                            >
                                <DesktopWindowsIcon className={classes.navLinkIcon}/>
                                Pulpit
                            </NavLink>
                        </ListItem>
                        <ListItem button >
                            <NavLink to="/app/budget"
                                     className={classes.navLink}
                                     activeStyle={{color: theme.palette.info.light}}

                            >
                                <AccountBalanceWalletIcon className={classes.navLinkIcon}/>
                                Budget
                            </NavLink>
                        </ListItem>
                        <ListItem button >
                            <NavLink to="/app/creditCalculator"
                                     className={classes.navLink}
                                     activeStyle={{color: theme.palette.info.light}}

                            >
                                <AccountBalanceIcon className={classes.navLinkIcon}/>
                                Kalkulator<br/> kredytowy
                            </NavLink>
                        </ListItem>
                        <ListItem button >
                            <NavLink to="/app/notes"
                                     className={classes.navLink}
                                     activeStyle={{color: theme.palette.info.light}}
                            >
                                <LibraryBooksIcon className={classes.navLinkIcon}/>
                                Notes
                            </NavLink>
                        </ListItem>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <HashRouter>
                        <Switch>
                            <Route exact path="/app/" component={Pulpit}/>
                            <Route path="/app/budget/" component={Budget}/>
                            <Route path="/app/creditCalculator/" component={CreditCalculator}/>
                            <Route path="/app/notes/" component={Notes}/>
                        </Switch>
                    </HashRouter>
                </main>
            </div>
        )
    } else {
        return <StartWindow />;
    }
}