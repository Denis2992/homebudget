import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Box, Typography} from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    box: {
      maxWidth: theme.spacing(130),
        margin: theme.spacing(5)
    },
    paperThisMonth: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        border: `2px solid ${theme.palette.secondary.main}`
    },
    incomeBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: theme.palette.success.main
    },
    expensesBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: theme.palette.error.main
    },
    paperSummaryBoxInfo: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around"
    },
    paperExpenses: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        border: `2px solid ${theme.palette.warning.main}`
    },
    boxCircleProgress: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: theme.spacing(2, 0)
    },
    circleProgressInfo: {
        color: theme.palette.success.main
    },
}));

const IncomeProgressBar = withStyles((theme) => ({
    root: {
        height: 12,
        borderRadius: 5,
        width: theme.spacing(25)
    },
    colorPrimary: {
        backgroundColor: theme.palette.primary.contrastText,
    },
    bar: {
        borderRadius: 5,
        backgroundColor: theme.palette.success.main
    },
}))(LinearProgress);

const ExpensesProgressBar = withStyles((theme) => ({
    root: {
        height: 12,
        borderRadius: 5,
        width: theme.spacing(25)
    },
    colorPrimary: {
        backgroundColor: theme.palette.primary.contrastText,
    },
    bar: {
        borderRadius: 5,
        backgroundColor: theme.palette.error.main
    },
}))(LinearProgress);

export default function Pulpit() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Box className={classes.box}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Paper className={classes.paperThisMonth} elevation={3}>
                            <Typography>W tym miesiącu</Typography>
                            <Box className={classes.incomeBox}>
                                <IncomeProgressBar variant="determinate" value={100} />
                                <ArrowDropUpIcon fontSize="large" />
                                <Typography>{3000}</Typography>
                            </Box>

                            <Box className={classes.expensesBox}>
                                <ExpensesProgressBar variant="determinate" value={66.6} />
                                <ArrowDropDownIcon fontSize="large" />
                                <Typography>{2000}</Typography>
                            </Box>
                            <Box className={classes.paperSummaryBoxInfo}>
                                <div className={classes.incomeBox}>
                                    <FiberManualRecordIcon />
                                    <Typography color="textSecondary" variant="body2">przychód</Typography>
                                </div>
                                <div className={classes.expensesBox}>
                                    <FiberManualRecordIcon />
                                    <Typography color="textSecondary" variant="body2">wydatki</Typography>
                                </div>
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs>
                        <Paper className={classes.paper}>xs</Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.paper}>xs</Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <Paper className={classes.paperExpenses} elevation={3}>
                            <Typography>Wykorzystano środków</Typography>
                            <Box className={classes.boxCircleProgress}>
                                <CircularProgress
                                    variant="determinate"
                                    value={66.6}
                                    thickness={10}
                                    size="130px"
                                    className={classes.circleProgressInfo}
                                />
                                <Typography>66,6%</Typography>
                            </Box>
                            <Typography>Reszta: {1000}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>xs=6</Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.paper}>xs</Paper>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}