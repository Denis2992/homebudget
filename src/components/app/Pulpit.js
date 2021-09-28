import React, {useContext} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Box, Divider, Typography} from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import {usersDataContext} from "../../App";
import Tooltip from "@material-ui/core/Tooltip";


const useStyles = makeStyles((theme) => ({
    box: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        maxWidth: theme.spacing(130),
        margin: theme.spacing(0, 2)
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
        border: `2px solid ${theme.palette.secondary.main}`,
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
        border: `2px solid ${theme.palette.info.light}`,
    },
    theBiggestExpensesSingleBox: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(1, 0)
    },
    theBiggestExpensesLinearProgressBar: {
        width: theme.spacing(25),
        height: 12,
        margin: theme.spacing(0,1),
        borderRadius: 15,
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
    },
    // last expenses
    lastExpenses: {
        padding: theme.spacing(1.6),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        border: `2px solid ${theme.palette.primary.light}`,
    },
    lastExpensesSingleBox: {
        display: "flex",
        justifyContent: "space-around",
        padding: theme.spacing(1, 0),
        cursor: "default",
    },

    // savings
    savings: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        border: `2px solid ${theme.palette.secondary.dark}`,

    },
    circleProgressSaving: {
        color: theme.palette.warning.main,
        padding: theme.spacing(2, 0),

    },
    //credits
    credits: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        border: `2px solid ${theme.palette.error.light}`,
        height: theme.spacing(28),
    },
    singleCredit: {
        padding: theme.spacing(1, 0),
        cursor: "default",
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
const IncomeProgressBar = withStyles((theme) => ({
    root: {
        height: 12,
        borderRadius: 5,
        width: theme.spacing(17),

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
const MaxExpensesProgressBar = withStyles((theme) => ({
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
        backgroundColor: theme.palette.info.light
    },
}))(LinearProgress);


export default function Pulpit() {
    const classes = useStyles();
    const {currentUserData} = useContext(usersDataContext);


    //budget data sort to render
    const budgetDataSorted = currentUserData?.budget?.sort((a,b) => {
        return b.id - a.id;
    });
    //savings data sort to render
    const savingDataSorted = currentUserData?.savings?.sort((a, b) => {
        return b.currentState - a.currentState
    });
    //budget sort by sum
    const expensesList = currentUserData?.budget?.filter(item => item.type === "expenses");
    const budgetSortBySum = expensesList?.sort((a,b) => {
        return b.summ - a.summ;
    })
    // monthly income, expenses, savings
    const date = new Date();
    const year = date.getFullYear();
    const month = "0" + (date.getMonth() + 1);
    const getMonthlyBudget = currentUserData?.budget?.filter(item => item.date.includes(`${year}-${month}`));

    const monthlyIncomeData = getMonthlyBudget?.filter(item => item.type === "income");
    const monthlyExpensesData = getMonthlyBudget?.filter(item => item.type === "expenses");
    const monthlySavingsData = getMonthlyBudget?.filter(item => item.type === "saving");

    const income = monthlyIncomeData?.map(item => item.summ);
    const expenses = monthlyExpensesData?.map(item => item.summ);
    const savings = monthlySavingsData?.map(item => item.summ);

    const incomeSum = income?.reduce((sum, prev) => +sum + +prev);
    const expensesSum = expenses?.reduce((sum, prev) => +sum + +prev);
    const savingsSum = savings?.length > 1 ? expenses?.reduce((prev, sum) => +prev + +sum) : savings;


    if (currentUserData) {
        return (
            <Box className={classes.box}>
                <Grid container spacing={2} style={{justifyContent: "center", marginLeft: 70}}>
                    <Grid item xs={9} sm={6} md={3}>
                <Paper className={classes.paperThisMonth} elevation={3}>
                            <Typography color="textPrimary">W tym miesiącu</Typography>
                            <Box className={classes.incomeBox}>
                                <IncomeProgressBar variant="determinate" value={100}/>
                                <ArrowDropUpIcon fontSize="large"/>
                                <Typography>{incomeSum}</Typography>
                            </Box>
                            <Box className={classes.expensesBox}>
                                <ExpensesProgressBar variant="determinate" value={expensesSum / incomeSum * 100}/>
                                <ArrowDropDownIcon fontSize="large"/>
                                <Typography>{expensesSum}</Typography>
                            </Box>
                            <Box className={classes.savingsBox}>
                                <SavingsProgressBar variant="determinate" value={savingsSum / incomeSum * 100}/>
                                <AddIcon style={{padding: "0 5px"}}/>
                                <Typography>{savingsSum}</Typography>
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
                    <Grid item xs={9} sm={6} md={3}>
                <Paper className={classes.paperExpenses} elevation={3}>
                            <Typography color="textPrimary">Wykorzystano środków</Typography>
                            <Box className={classes.boxCircleProgress}>
                                <CircularProgress
                                    variant="determinate"
                                    value={(+expensesSum + +savingsSum) / incomeSum * 100}
                                    thickness={10}
                                    size="143px"
                                    className={classes.circleProgressInfo}
                                />
                                <Typography>{((+expensesSum + +savingsSum) / incomeSum * 100).toFixed(1)}%</Typography>
                            </Box>
                            <Typography>Reszta: {incomeSum - (+expensesSum + +savingsSum)}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={9} sm={6} md={6}>
                <Paper className={classes.lastExpenses} elevation={3}>
                            <Typography color="textPrimary">Ostatnie wydatki i przychody</Typography>

                            {budgetDataSorted?.map((item, i) => i < 5 ? (
                                <div key={item.id}>
                                    <LightTooltip title="Nazwa Kategoria Suma" >
                                        <Box className={classes.lastExpensesSingleBox}>
                                            <Typography style={{width: 180}}>{item.title}</Typography>
                                            <Typography style={{width: 120}}>{item.category}</Typography>
                                            <Typography style={{width: 100}}>{item.summ}</Typography>
                                        </Box>
                                    </LightTooltip>
                                    <Divider variant="middle" />
                                </div>
                                ) : null
                            )}
                        </Paper>
                    </Grid>
                    <Grid item xs={9} sm={6} md={6}>
                <Paper className={classes.theBiggestExpenses} elevation={3}>
                            <Typography color="textPrimary">Twoje największe wydatki przez cały czas</Typography>
                            {budgetSortBySum?.map((item, i) => i < 5 ? (
                                <Box className={classes.theBiggestExpensesSingleBox} key={item.id}>
                                    <Typography style={{width: 180}}>{item.title}</Typography>
                                    <MaxExpensesProgressBar
                                        variant="determinate"
                                        value={item.summ / 100}
                                        className={classes.theBiggestExpensesLinearProgressBar}
                                    />
                                    <Typography style={{width: 80}}>{item.summ}</Typography>
                                </Box>
                            ) : null )}
                        </Paper>
                    </Grid >
                    <Grid item xs={9} sm={6} md={3}>
                <Paper className={classes.credits} elevation={3}>
                            <Typography color="textPrimary">Aktualne kredyty</Typography>
                            {currentUserData?.credits?.map((item, i) => i < 5 ? (
                                    <div key={item.id}>
                                        <LightTooltip title="Nazwa: zostało do spłaty" key={item.id}>
                                            <Typography
                                                className={classes.singleCredit}
                                            >
                                                {item.creditTitle}: {item.leftSumm}
                                            </Typography>
                                        </LightTooltip>
                                        <Divider variant="middle"/>
                                    </div>
                                ) : null
                            )}
                        </Paper>
                    </Grid>
                    <Grid item xs={9} sm={6} md={3}>
                <Paper className={classes.savings} elevation={3}>
                            {savingDataSorted?.map((item, i) => i < 1 ? (
                                <Box key={item.id}>
                                    <Typography color="textPrimary">
                                        Aktualnie zbierasz na: {item.name}
                                    </Typography>
                                    <CircularProgress
                                        variant="determinate"
                                        value={item.currentState / item.goal * 100}
                                        thickness={22}
                                        size="100px"
                                        className={classes.circleProgressSaving}
                                    />
                                    <Typography variant="body2">Zebrano {item.currentState / item.goal * 100}%</Typography>
                                    <Typography variant="body2">Potrzebujesz {item.goal}</Typography>
                                </Box>
                                ) : null
                            )}
                        </Paper>
                </Grid>
                </Grid>
            </Box>
        );
    } else {
        return <Typography>Loading...</Typography>
    }
}