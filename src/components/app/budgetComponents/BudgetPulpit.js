import React, {createContext, useEffect, useState} from "react";
import BudgetTableSummary from "./BudgetTableSummary";
import CreditTableSummary from "./CreditTableSummary";
import {makeStyles, Container, Grid} from "@material-ui/core";
import Savings from "./Savings";
import SortPulpitBudget from "./SortPulpitBudget";


const useStyles = makeStyles((theme) => ({
    mainContainer: {
        maxWidth: theme.spacing(162.5),
    },

}));

export const datesContext = createContext("");

export default function BudgetPulpit () {
    const classes = useStyles();
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [months, setMonths] = useState([]);
    const [years, setYears] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/months")
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                } else {
                    throw new Error("Błąd sieci!");
                }
            })
            .then((data) => {
                setMonths(data);
            })
            .catch(err => console.log("Błąd!", err));

        fetch("http://localhost:3001/years")
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                } else {
                    throw new Error("Błąd sieci!");
                }
            })
            .then((data) => {
                setYears(data);
            })
            .catch(err => console.log("Błąd!", err));

        const date = new Date();
        setYear(date.getFullYear());
        setMonth("0" + (date.getMonth() + 1));
    }, []);

    return (
        <datesContext.Provider value={{
            month, setMonth,
            year, setYear,
            months, setMonths,
            years, setYears
        }}>
            <Container className={classes.mainContainer}>
                <Grid container spacing={2} style={{justifyContent: "center", marginLeft: 54}}>
                    <Grid item xs={8} sm={12} md={6}><SortPulpitBudget /></Grid>
                    <Grid item xs={8} sm={12} md={6}><Savings /></Grid>
                    <Grid item xs={9} sm={12} md={6}><BudgetTableSummary /></Grid>
                    <Grid item xs={9} sm={12} md={6}><CreditTableSummary /></Grid>
                </Grid>
            </Container>
        </datesContext.Provider>
    )
}