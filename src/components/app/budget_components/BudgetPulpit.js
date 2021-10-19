import React, {createContext, useState} from "react";
import BudgetTableSummary from "./BudgetTableSummary";
import CreditTableSummary from "./CreditTableSummary";
import {makeStyles, Container, Grid} from "@material-ui/core";
import Savings from "./Savings";
import SortPulpitBudget from "./SortPulpitBudget";


const useStyles = makeStyles((theme) => ({
    mainContainer: {
        maxWidth: theme.spacing(130),
    },
    gridBox: {
        justifyContent: "center",
        marginLeft: 54,
        [theme.breakpoints.up('sm')]: {
            marginLeft: 0
        },
    }
}));

export const datesContext = createContext("");

export default function BudgetPulpit () {
    const classes = useStyles();
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');



    return (
        <datesContext.Provider value={{
            month, setMonth,
            year, setYear,
        }}>
            <Container className={classes.mainContainer}>
                <Grid container spacing={2} className={classes.gridBox}>
                    <Grid item xs={8} sm={12} md={6}><SortPulpitBudget /></Grid>
                    <Grid item xs={8} sm={12} md={6}><Savings /></Grid>
                    <Grid item xs={9} sm={12} md={6}><BudgetTableSummary /></Grid>
                    <Grid item xs={9} sm={12} md={6}><CreditTableSummary /></Grid>
                </Grid>
            </Container>
        </datesContext.Provider>
    )
}