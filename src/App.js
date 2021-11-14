import React from 'react';
import {HashRouter, Switch, Route} from "react-router-dom";
import StartWindow from "./components/app/StartWindow";
import Header from "./components/app/Header";





function App() {
    // const [currentUserData, setCurrentUserData] = useState([]);
    // const {currentUser} = useContext(currentUserContext);
    // const firebase = getFirebase();
    //
    //
    //
    // useEffect( () => {
    //     const fetch = async () => {
    //         await firebase
    //             .firestore()
    //             .collection(`${currentUser}`)
    //             .doc("userData")
    //             .get()
    //             .then(snapshot => setCurrentUserData(snapshot.data()))
    //     };
    //
    //     fetch();
    // }, [currentUser, firebase]);


    return (
      <HashRouter>
          <Switch>
              <Route exact path="/app" component={Header}/>
              <Route path="/app" component={StartWindow} />
          </Switch>
      </HashRouter>
  );
}

export default App;
