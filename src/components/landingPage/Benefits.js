import React from 'react';
import Paper from '@material-ui/core/Paper';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SearchIcon from '@material-ui/icons/Search';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import {Typography, makeStyles, Container} from "@material-ui/core";
import {theme} from "../../index";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: theme.spacing(187.5),
        width: "100%",
        margin: "24px auto",
    },
    container: {
        margin: "16px auto",
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap"
    },
    paper: {
        padding: theme.spacing(4, 3),
        margin: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
        width: 300,

        border: `2px solid ${theme.palette.info.main}`,

    },
    checkIcon: {
        color: theme.palette.info.main
    },
    paperHead: {
        fontWeight: 600,
        padding: theme.spacing(2, 0)
    },
    paperParagraph: {
        lineHeight: theme.spacing(0.25)
    }
}));

const Benefits = () => {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Paper className={classes.paper} elevation={3}>
                <CheckCircleIcon className={classes.checkIcon} fontSize="large"/>
                <Typography variant="h5" className={classes.paperHead}>Lorem ipsum dolor</Typography>
                <Typography className={classes.paperParagraph}>Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.
                </Typography>
            </Paper>
            <Paper className={classes.paper} elevation={3} style={{borderColor: theme.palette.secondary.main}}>
                <SearchIcon color="secondary" fontSize="large" />
                <Typography variant="h5" className={classes.paperHead}>Lorem ipsum dolor</Typography>
                <Typography className={classes.paperParagraph}>Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.
                </Typography>
            </Paper>
            <Paper className={classes.paper} belevation={3} style={{borderColor: theme.palette.primary.main}}>
                <MonetizationOnIcon color="primary" fontSize="large"/>
                <Typography variant="h5" className={classes.paperHead}>Lorem ipsum dolor</Typography>
                <Typography className={classes.paperParagraph}>Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.
                </Typography>
            </Paper>
        </Container>
    );
};

export default Benefits;