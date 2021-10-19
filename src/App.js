import React, {createContext, useContext, useEffect, useState} from 'react';
import {HashRouter, Switch, Route} from "react-router-dom";
import StartWindow from "./components/app/StartWindow";
import Header from "./components/app/Header";
import {CurrentUserContext} from "./index";
import getFirebase from "./components/firebase/firebase";


export const usersDataContext = createContext('');
export const usersApiUrl = "http://localhost:3001/users";
export const categoriesApiUrl = "http://localhost:3001/categories"

function App() {
    const [usersData, setUsersData] = useState([]);
    const [currentUserData, setCurrentUserData] = useState([]);
    const {currentUser} = useContext(CurrentUserContext);
    const firebase = getFirebase();


    useEffect( () => {
        const fetch = async () => {
            await firebase
                .firestore()
                .collection(`${currentUser}`)
                .doc("userData")
                .get()
                .then(snapshot => setCurrentUserData(snapshot.data()))
        };

        fetch();
    }, [currentUser, firebase]);


    return (
      <usersDataContext.Provider
          value={{
              usersData,
              setUsersData,
              currentUserData,
              setCurrentUserData,
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
