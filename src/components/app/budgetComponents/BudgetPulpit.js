import React from "react";
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


export default function BudgetPulpit () {
    const classes = useStyles();

    return (
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
    )
}