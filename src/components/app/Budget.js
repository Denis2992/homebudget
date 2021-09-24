import React, {createContext, useContext, useState} from "react";
import {HashRouter, Route, Switch} from "react-router-dom";
import BudgetPulpit from "./budgetComponents/BudgetPulpit";
import BudgetTableFull from "./budgetComponents/BudgetTableFull"
import CreditTableFull from "./budgetComponents/CreditTableFull";
import SavingsTable from "./budgetComponents/SavingsTable";
import {usersDataContext} from "../../App";
import {Typography} from "@material-ui/core";




export default function Budget() {
    const {currentUserData} = useContext(usersDataContext);

    if (currentUserData){
        return (
            <>
                <HashRouter>
                    <Switch>
                        <Route exact path="/app/budget/" component={BudgetPulpit} />
                        <Route path="/app/budget/dataBudget/" component={BudgetTableFull} />
                        <Route path="/app/budget/dataCredit/" component={CreditTableFull} />
                        <Route path="/app/budget/dataSavings/" component={SavingsTable} />
                    </Switch>
                </HashRouter>
            </>
        );
    } else {
        return <Typography>Loading</Typography>
    }

}