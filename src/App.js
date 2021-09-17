import React from 'react';
import {HashRouter, Switch, Route} from "react-router-dom";
import StartWindow from "./components/app/StartWindow";
import Header from "./components/app/Header";





function App() {
  return (
      <HashRouter>
          <Switch>
              <Route exact path="/app/" component={StartWindow}/>
              <Route path="/app" component={Header} />
          </Switch>
      </HashRouter>
  );
}

export default App;
