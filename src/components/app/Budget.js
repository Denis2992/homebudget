import React from "react";
import {HashRouter, Route, Switch} from "react-router-dom";
import BudgetPulpit from "./budget_components/BudgetPulpit";
import BudgetTableFull from "./budget_components/BudgetTableFull"
import CreditTableFull from "./budget_components/CreditTableFull";
import SavingsTable from "./budget_components/SavingsTable";


export default function Budget() {

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
}