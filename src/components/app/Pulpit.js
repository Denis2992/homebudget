import React, {useContext} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Box, Typography} from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import {usersDataContext} from "../../App";


const useStyles = makeStyles((theme) => ({

    box: {
        position: "absolute",
        left: 121,
        top: 96

    },
    //this month income/expenses
    paperThisMonth: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        border: `2px solid ${theme.palette.warning.dark}`,

    },
    incomeBox: {
        display: "flex",
        alignItems: "center",
        color: theme.palette.success.main,
        padding: theme.spacing(0.7, 0)
    },
    expensesBox: {
        display: "flex",
        alignItems: "center",
        color: theme.palette.error.main,
        padding: theme.spacing(0.7, 0)
    },
    savingsBox: {
        display: "flex",
        alignItems: "center",
        color: theme.palette.secondary.dark,
        padding: theme.spacing(0.7, 0)
    },
    paperSummaryBoxInfo: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around"
    },
    //expenses money Circle
    paperExpenses: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        border: `2px solid ${theme.palette.secondary.main}`
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
    //the biggestExpenses
    theBiggestExpenses: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        border: `2px solid ${theme.palette.info.light}`
    },
    theBiggestExpensesSingleBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing(1, 0)
    },
    theBiggestExpensesLinearProgressBar: {
        width: theme.spacing(25),
        height: 12,
        margin: theme.spacing(0 ,2),
        borderRadius: 15
    },
    // last expenses
    lastExpenses: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        border: `2px solid ${theme.palette.primary.light}`
    },
    lastExpensesSingleBox: {
        display: "flex",
        justifyContent: "space-around",
        padding: theme.spacing(1, 0)
    },
    // savings
    savings: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        border: `2px solid ${theme.palette.error.light}`
    },
    circleProgressSaving: {
        color: theme.palette.warning.main,
        padding: theme.spacing(2, 0)
    },
    credits: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        border: `2px solid ${theme.palette.secondary.dark}`,
        height: theme.spacing(28)
    },
    singleCredit: {
       padding: theme.spacing(1, 0)
    }
}));

const IncomeProgressBar = withStyles((theme) => ({
    root: {
        height: 12,
        borderRadius: 5,
        width: theme.spacing(17)
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
        width: theme.spacing(17)
    },
    colorPrimary: {
        backgroundColor: theme.palette.primary.contrastText,
    },
    bar: {
        borderRadius: 5,
        backgroundColor: theme.palette.error.main
    },
}))(LinearProgress);
const SavingsProgressBar = withStyles((theme) => ({
    root: {
        height: 12,
        borderRadius: 5,
        width: theme.spacing(17)
    },
    colorPrimary: {
        backgroundColor: theme.palette.primary.contrastText,
    },
    bar: {
        borderRadius: 5,
        backgroundColor: theme.palette.secondary.dark
    },
}))(LinearProgress);



export default function Pulpit() {
    const classes = useStyles();
    const {currentUserData} = useContext(usersDataContext);

    if (currentUserData) {
        return (
            <Box className={classes.box}>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Paper className={classes.paperThisMonth} elevation={3}>
                            <Typography color="textPrimary">W tym miesiącu</Typography>
                            <Box className={classes.incomeBox}>
                                <IncomeProgressBar variant="determinate" value={100}/>
                                <ArrowDropUpIcon fontSize="large"/>
                                <Typography>{3000}</Typography>
                            </Box>
                            <Box className={classes.expensesBox}>
                                <ExpensesProgressBar variant="determinate" value={66.6}/>
                                <ArrowDropDownIcon fontSize="large"/>
                                <Typography>{2000}</Typography>
                            </Box>
                            <Box className={classes.savingsBox}>
                                <SavingsProgressBar variant="determinate" value={10}/>
                                <AddIcon style={{padding: "0 5px"}}/>
                                <Typography>{300}</Typography>
                            </Box>
                            <Box className={classes.paperSummaryBoxInfo}>
                                <div className={classes.incomeBox}>
                                    <FiberManualRecordIcon/>
                                    <Typography color="textSecondary" variant="body2">przychód</Typography>
                                </div>
                                <div className={classes.expensesBox}>
                                    <FiberManualRecordIcon/>
                                    <Typography color="textSecondary" variant="body2">wydatki</Typography>
                                </div>
                            </Box>
                            <div className={classes.savingsBox} style={{justifyContent: "center"}}>
                                <FiberManualRecordIcon/>
                                <Typography color="textSecondary" variant="body2">oszczędności</Typography>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.paperExpenses} elevation={3}>
                            <Typography color="textPrimary">Wykorzystano środków</Typography>
                            <Box className={classes.boxCircleProgress}>
                                <CircularProgress
                                    variant="determinate"
                                    value={66.6}
                                    thickness={10}
                                    size="143px"
                                    className={classes.circleProgressInfo}
                                />
                                <Typography>66,6%</Typography>
                            </Box>
                            <Typography>Reszta: {1000}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.lastExpenses} elevation={3}>
                            <Typography color="textPrimary">Twoje ostatnie wydatki</Typography>
                            <div className={classes.lastExpensesSingleBox}>
                                <FiberManualRecordIcon/>
                                <Typography>Kategoria</Typography>
                                <Typography>Nazwa</Typography>
                                <Typography>Cena</Typography>
                            </div>
                            <div className={classes.lastExpensesSingleBox}>
                                <FiberManualRecordIcon/>
                                <Typography>Kategoria</Typography>
                                <Typography>Nazwa</Typography>
                                <Typography>Cena</Typography>
                            </div>
                            <div className={classes.lastExpensesSingleBox}>
                                <FiberManualRecordIcon/>
                                <Typography>Kategoria</Typography>
                                <Typography>Nazwa</Typography>
                                <Typography>Cena</Typography>
                            </div>
                            <div className={classes.lastExpensesSingleBox}>
                                <FiberManualRecordIcon/>
                                <Typography>Kategoria</Typography>
                                <Typography>Nazwa</Typography>
                                <Typography>Cena</Typography>
                            </div>
                            <div className={classes.lastExpensesSingleBox}>
                                <FiberManualRecordIcon/>
                                <Typography>Kategoria</Typography>
                                <Typography>Nazwa</Typography>
                                <Typography>Cena</Typography>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={5}>
                        <Paper className={classes.theBiggestExpenses} elevation={3}>
                            <Typography color="textPrimary">Twoje największe wydatki przez cały czas</Typography>
                            <div className={classes.theBiggestExpensesSingleBox}>
                                <FiberManualRecordIcon/>
                                <Typography>Kategoria</Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={100}
                                    className={classes.theBiggestExpensesLinearProgressBar}
                                />
                                <Typography>{3000}</Typography>
                            </div>
                            <div className={classes.theBiggestExpensesSingleBox}>
                                <FiberManualRecordIcon/>
                                <Typography>Kategoria</Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={100}
                                    className={classes.theBiggestExpensesLinearProgressBar}
                                />
                                <Typography>{3000}</Typography>
                            </div>
                            <div className={classes.theBiggestExpensesSingleBox}>
                                <FiberManualRecordIcon/>
                                <Typography>Kategoria</Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={100}
                                    className={classes.theBiggestExpensesLinearProgressBar}
                                />
                                <Typography>{3000}</Typography>
                            </div>
                            <div className={classes.theBiggestExpensesSingleBox}>
                                <FiberManualRecordIcon/>
                                <Typography>Kategoria</Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={100}
                                    className={classes.theBiggestExpensesLinearProgressBar}
                                />
                                <Typography>{3000}</Typography>
                            </div>
                            <div className={classes.theBiggestExpensesSingleBox}>
                                <FiberManualRecordIcon/>
                                <Typography>Kategoria</Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={100}
                                    className={classes.theBiggestExpensesLinearProgressBar}
                                />
                                <Typography>{3000}</Typography>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.savings} elevation={3}>
                            <Typography color="textPrimary">Aktualnie zbierasz pieniądze na wakacje</Typography>
                            <CircularProgress
                                variant="determinate"
                                value={40}
                                thickness={22}
                                size="100px"
                                className={classes.circleProgressSaving}
                            />
                            <Typography variant="body2">Zebrano 40%</Typography>
                            <Typography variant="body2">Potrzebujesz 10000</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.credits} elevation={3}>
                            <Typography color="textPrimary">Aktualne kredyty</Typography>
                            <Typography className={classes.singleCredit}>Nazwa: zostało do splaty</Typography>
                            <Typography className={classes.singleCredit}>Nazwa: zostało do splaty</Typography>
                            <Typography className={classes.singleCredit}>Nazwa: zostało do splaty</Typography>
                            <Typography className={classes.singleCredit}>Nazwa: zostało do splaty</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        );
    } else {
        return <Typography>Loading...</Typography>
    }
}