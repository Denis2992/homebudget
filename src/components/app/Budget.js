import React from "react";
import {HashRouter, Route, Switch} from "react-router-dom";
import BudgetPulpit from "./budgetComponents/BudgetPulpit";
import BudgetTableFull from "./budgetComponents/BudgetTableFull";
import CreditTableFull from "./budgetComponents/CreditTableFull";
import SavingTable from "./budgetComponents/SavingTable";




export default function Budget() {

    return (
        <>
            <HashRouter>
                <Switch>
                    <Route exact path="/app/budget/" component={BudgetPulpit} />
                    <Route path="/app/budget/dataBudget/" component={BudgetTableFull} />
                    <Route path="/app/budget/dataCredit/" component={CreditTableFull} />
                    <Route path="/app/budget/dataSavings/" component={SavingTable} />
                </Switch>
            </HashRouter>
        </>

    );
}