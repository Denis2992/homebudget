import React, {createContext, useEffect, useState} from "react";
import BudgetTableSummary from "./BudgetTableSummary";
import CreditTableSummary from "./CreditTableSummary";
import {makeStyles, Container, Box} from "@material-ui/core";
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
                <Box style={{display: "flex", justifyContent: "space-between", flexWrap: "wrap"}}>
                    <SortPulpitBudget />
                    <Savings />
                </Box>

                <Box style={{display: "flex", justifyContent: "space-between", maxWidth: 1300}}>
                    <BudgetTableSummary />
                    <CreditTableSummary />
                </Box>
            </Container>
        </datesContext.Provider>
    )
}