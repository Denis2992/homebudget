import React, {useContext, useState} from 'react';
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
import {HashRouter, Link, NavLink, Route, Switch} from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import StartWindow from "./StartWindow";
import Pulpit from "./Pulpit";
import Budget from "./Budget";
import {currentUserContext} from "../../index";
import getFirebase from "../firebase/firebase";


const drawerWidth = 150;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: "center",
        width: "100%",
        margin: theme.spacing(4, 0)

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
        marginRight: 10,
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
            width: theme.spacing(7) + 1,
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
        backgroundColor: theme.palette.info.light,
        marginRight: theme.spacing(2),
    },
    avatarMobile: {
        width: 30,
        height: 30,
        backgroundColor: theme.palette.info.light,
        marginRight: theme.spacing(2),
    },
    userBox : {
        display: "none",
        alignItems: "center",
        [theme.breakpoints.up('sm')]: {
            display: "flex"
        },
    },
    userInfoMobile: {
        padding: 13,
        [theme.breakpoints.up('sm')]: {
            display: "none"
        },
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
    exitLinkMobile: {
        display: "flex",
        paddingTop: 10,
        textDecoration: "none",
        color:theme.palette.text.secondary
    },
    exitBtnMobile: {
        [theme.breakpoints.up('sm')]: {
            display: "none"
        },
    },
    list: {
        margin: theme.spacing(1, 0)
    },
    navLink: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: theme.palette.text.secondary,
        textDecoration: "none",
        fontSize: 20,
        padding: theme.spacing(1.5, 0),
        margin: 0

    },
    navLinkIcon: {
        marginRight: theme.spacing(2.2),
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
    const {currentUser, setCurrentUser} = useContext(currentUserContext);
    const firebase = getFirebase();


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleExitApp = async () => {

            try {
                if (firebase) {
                    await firebase.auth().signOut();
                }
                setCurrentUser(null);
            } catch (error) {
                console.log("error", error);
            }
    };

    if (currentUser) {
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
                            <Avatar className={classes.avatar}>{currentUser[0].toUpperCase()}</Avatar>
                            <Typography>{currentUser}</Typography>
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
                        <ListItem className={classes.userInfoMobile}>
                            <Avatar
                                className={classes.avatarMobile}
                            >
                                {currentUser[0].toUpperCase()}
                            </Avatar>
                            <Typography>{currentUser}</Typography>
                        </ListItem>
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
                        <ListItem button onClick={handleExitApp} className={classes.exitBtnMobile}>
                            <Link
                                to="/app"
                                className={classes.exitLinkMobile}
                            >
                                <ExitToAppIcon color="error" style={{marginRight: 18}}/>
                                <Typography>Wyjdź</Typography>
                            </Link>
                        </ListItem>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <HashRouter>
                        <Switch>
                            <Route exact path="/app/" component={Pulpit}/>
                            <Route path="/app/budget/" component={Budget}/>
                        </Switch>
                    </HashRouter>
                </main>
            </div>
        )
    } else {
        return <StartWindow />;
    }
}