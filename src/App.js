import React, {createContext, useEffect, useState} from 'react';
import {HashRouter, Switch, Route} from "react-router-dom";
import StartWindow from "./components/app/StartWindow";
import Header from "./components/app/Header";

export const usersDataContext = createContext('');
export const usersApiUrl = "http://localhost:3001/users";
export const categoriesApiUrl = "http://localhost:3001/categories"

function App() {

    const [usersData, setUsersData] = useState([]);
    const [currentUserData, setCurrentUserData] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);


    useEffect(() => {
        fetch(usersApiUrl)
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                } else {
                    throw new Error("Błąd sieci!");
                }
            })
            .then((data) => {
                setUsersData(data);
            })
            .catch(err => console.log("Błąd!", err));

        fetch(categoriesApiUrl)
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                } else {
                    throw new Error("Błąd sieci!");
                }
            })
            .then((data) => {
                setCategoriesList(data);
            })
            .catch(err => console.log("Błąd!", err));
    }, []);

    return (
      <usersDataContext.Provider
          value={{
              usersData,
              setUsersData,
              currentUserData,
              setCurrentUserData,
              categoriesList,
              setCategoriesList
          }}
      >
      <HashRouter>
          <Switch>
              <Route exact path="/app" component={Header}/>
              <Route path="/app" component={StartWindow} />
          </Switch>
      </HashRouter>
      </usersDataContext.Provider>
  );
}

export default App;
