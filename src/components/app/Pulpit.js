import React, {useContext, useEffect, useState} from 'react';
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
import Tooltip from "@material-ui/core/Tooltip";
import {currentUserContext} from "../../index";
import getFirebase from "../firebase/firebase";


const useStyles = makeStyles((theme) => ({
    box: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        maxWidth: theme.spacing(130),
        margin: theme.spacing(0, 2)
    },
    gridBox: {
        justifyContent: "center",
        marginLeft: 70,
        [theme.breakpoints.up('sm')]: {
            marginLeft: 0
        },
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
    const [budget, setBudget] = useState([]);
    const [savings, setSavings] = useState([]);
    const [credits, setCredits] = useState([]);
    const {currentUser} = useContext(currentUserContext);
    const firebase = getFirebase();

    useEffect(() => {
        const fetch = async () => {
            try {
                if (!firebase) return;
                const db = firebase.firestore();
                const ref = db.collection(`${currentUser}`);
                await ref.get()
                    .then(querySnapshot => {
                        return querySnapshot.docs[0].ref.collection("budget").get();
                    })
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            setBudget(prevState => [...prevState, doc.data()])
                        })
                    })

                await ref.get()
                    .then(querySnapshot => {
                        return querySnapshot.docs[0].ref.collection("credits").get();
                    })
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            setCredits(prevState => [...prevState, doc.data()])
                        })
                    })

                await ref.get()
                    .then(querySnapshot => {
                        return querySnapshot.docs[0].ref.collection("savings").get();
                    })
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            setSavings(prevState => [...prevState, doc.data()])
                        })
                    })
            } catch (error) {
                console.log("error", error);
            }
        };

        fetch();
    }, [currentUser, firebase]);

    //budget data sort to render
    const budgetDataSorted = budget?.sort((a,b) => {
        return b.id - a.id;
    });
    //savings data sort to render
    const savingDataSorted = savings?.sort((a, b) => {
        return b.currentState - a.currentState
    });
    //budget sort by sum
    const expensesList = budget?.filter(item => item.type === "expenses");
    const budgetSortBySum = expensesList?.sort((a,b) => {
        return b.summ - a.summ;
    })
    // monthly income, expenses, savings
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const correctMonth = () => {
        if (month > 9) {
            return month;
        } else {
            return `0${month}`
        }
    };

    const getMonthlyBudget = budget.filter(item => item.date.includes(`${year}-${correctMonth()}`));

    const monthlyIncomeData = getMonthlyBudget?.filter(item => item.type === "income");
    const monthlyExpensesData = getMonthlyBudget?.filter(item => item.type === "expenses");
    const monthlySavingsData = getMonthlyBudget?.filter(item => item.type === "saving");

    const income = monthlyIncomeData?.map(item => item.sum);
    const expenses = monthlyExpensesData?.map(item => item.sum);
    const saving = monthlySavingsData?.map(item => item.sum);

    const incomeSum = income?.reduce((sum, prev) => +sum + +prev, 0);
    const expensesSum = expenses?.reduce((sum, prev) => +sum + +prev, 0);
    const savingsSum = saving?.reduce((prev, sum) => +prev + +sum, 0);


    const circleProgressValue = () => {
        let progressValue = (+expensesSum + +savingsSum) / incomeSum * 100;
        if (isNaN((+expensesSum + +savingsSum) / incomeSum * 100)) {
            return 0;
        } else {
            return progressValue;
        }
    };

    const restIncome = incomeSum - (+expensesSum + +savingsSum)


    if (currentUser) {
        return (
            <Box className={classes.box}>
                <Grid container spacing={2} className={classes.gridBox}>
                    <Grid item xs={9} sm={6} md={3}>
                        <Paper className={classes.paperThisMonth} elevation={3}>
                            <Typography color="textPrimary">W tym miesiącu</Typography>
                            {incomeSum || expensesSum || savingsSum ? (
                                <>
                                    <Box className={classes.incomeBox}>
                                        <IncomeProgressBar variant="determinate" value={100}/>
                                        <ArrowDropUpIcon fontSize="large"/>
                                        <Typography>{incomeSum ? incomeSum : 0}</Typography>
                                    </Box>
                                    <Box className={classes.expensesBox}>
                                        <ExpensesProgressBar variant="determinate" value={expensesSum / incomeSum * 100}/>
                                        <ArrowDropDownIcon fontSize="large"/>
                                        <Typography>{expensesSum ? expensesSum : 0}</Typography>
                                    </Box>
                                    <Box className={classes.savingsBox}>
                                        <SavingsProgressBar variant="determinate" value={savingsSum / incomeSum * 100}/>
                                        <AddIcon style={{padding: "0 5px"}}/>
                                        <Typography>{savingsSum ? savingsSum : 0}</Typography>
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
                                </>
                            ) : null}
                        </Paper>
                    </Grid>

                    <Grid item xs={9} sm={6} md={3}>
                        <Paper className={classes.paperExpenses} elevation={3}>
                            <Typography color="textPrimary">Wykorzystano środków</Typography>
                            {restIncome ? (
                                <>
                                    <Box className={classes.boxCircleProgress}>
                                        <CircularProgress
                                            variant="determinate"
                                            value={circleProgressValue()}
                                            thickness={10}
                                            size="143px"
                                            className={classes.circleProgressInfo}
                                        />
                                        <Typography>{circleProgressValue().toFixed(1)}%</Typography>
                                    </Box>
                                    <Typography>Reszta: {restIncome ? restIncome : 0}</Typography>
                                </>
                            ) : null}
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
                                            <Typography style={{width: 100}}>{item.sum}</Typography>
                                        </Box>
                                    </LightTooltip>
                                    {i < 4 ? (<Divider variant="middle" />) : null}
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
                                        value={item.sum / 100}
                                        className={classes.theBiggestExpensesLinearProgressBar}
                                    />
                                    <Typography style={{width: 80}}>{item.sum}</Typography>
                                </Box>
                            ) : null )}
                        </Paper>
                    </Grid >

                    <Grid item xs={9} sm={6} md={3}>
                        <Paper className={classes.credits} elevation={3}>
                            <Typography color="textPrimary">Aktualne kredyty</Typography>
                            {credits?.map((item, i) => i < 5 ? (
                                    <div key={item.id}>
                                        <LightTooltip title="Nazwa: zostało do spłaty" key={item.id}>
                                            <Typography
                                                className={classes.singleCredit}
                                            >
                                                {item.title}: {item.leftSum}
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
                            <Typography color="textPrimary">Aktualnie zbierasz na:</Typography>
                            {savingDataSorted?.map((item, i) => i < 1 ? (
                                <Box key={item.id}>
                                    <Typography color="textPrimary">{item.name}</Typography>
                                    <CircularProgress
                                        variant="determinate"
                                        value={item.currentState / item.goal * 100}
                                        thickness={22}
                                        size="80px"
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