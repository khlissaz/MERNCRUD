import React from 'react';
import './App.css';
import Users from './components/userComponent/users';
import Modeles from './components/modeleComponent/modele';
import Produits from './components/produitComponenet/produits';
import Appbar from './components/appbar/Appbar'
import { Provider } from "react-redux";
import { store } from "./actions/store";
import { Container} from "@material-ui/core"
import ButterToast, { POS_RIGHT, POS_TOP } from "butter-toast";
import { BrowserRouter as Router, Route } from "react-router-dom";


function App() {
  return (

    <Provider store={store}>
      <Container >
        <Router>

          <Appbar />
          <br />
          <Route path="/users"  component={Users} />
          <Route path="/modeles"  component={Modeles} />
          <Route path="/produits"  component={Produits} />


          <ButterToast position={{ vertical: POS_RIGHT, horizontal: POS_TOP }} />
        </Router>
      </Container>


    </Provider>
  );
}

export default App;
