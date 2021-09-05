import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SearchIcon from '@material-ui/icons/Search';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import {Typography, makeStyles} from "@material-ui/core";
import {theme} from "../../index";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 1500,
        margin: "24px auto",
    },
    gridContainer: {
        display: "flex",
        justifyContent: "space-around",
        margin: "0 auto"
    },
    paper: {
        padding: theme.spacing(4, 3),
        textAlign: 'center',
        color: theme.palette.text.primary,
        maxWidth: 300,
        flexBasis: 0,
        border: `2px solid ${theme.palette.info.main}`
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

    function FormRow() {
        return (
            <>
                <Grid item xs={4}>
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
                </Grid>
                <Grid item xs={4}>
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
                </Grid>
                <Grid item xs={4}>
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
                </Grid>
            </>
        );
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid container item xs={12} spacing={3} className={classes.gridContainer}>
                    <FormRow />
                </Grid>
            </Grid>
        </div>
    );
};

export default Benefits;