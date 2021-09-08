import React, {useState} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Button from '@material-ui/core/Button';
import {Box} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import calculator from "../images/calculator.svg"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function AppPulpit() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
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
                        <HomeIcon />
                        <Typography variant="h5" noWrap className={classes.headerToolBarBoxLogoText}>
                            BudgetDomowy
                        </Typography>
                    </Box>
                    <Button color="inherit">Login</Button>
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
                <List>
                    {['Pulpit', 'Budget', 'Kalkulator kredytowy', 'Notes'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {[index % 2 === 0 ? <InboxIcon /> : <MailIcon />]}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            {/*<main className={classes.content}>*/}
            {/*    <div className={classes.toolbar} />*/}
            {/*    <Typography paragraph>*/}
            {/*        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt*/}
            {/*        ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum*/}
            {/*        facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit*/}
            {/*        gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id*/}
            {/*        donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit*/}
            {/*        adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.*/}
            {/*        Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis*/}
            {/*        imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget*/}
            {/*        arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem*/}
            {/*        donec massa sapien faucibus et molestie ac.*/}
            {/*    </Typography>*/}
            {/*    <Typography paragraph>*/}
            {/*        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla*/}
            {/*        facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac*/}
            {/*        tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat*/}
            {/*        consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed*/}
            {/*        vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In*/}
            {/*        hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et*/}
            {/*        tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin*/}
            {/*        nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas*/}
            {/*        accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.*/}
            {/*    </Typography>*/}
            {/*</main>*/}
        </div>
    );
}