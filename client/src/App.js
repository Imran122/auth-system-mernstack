
import './App.css';
import './css/Form.css';
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LogIn from './components/Authentication/LogIn/LogIn';
import Registration from './components/Authentication/Registration/Registration';
import Home from './components/Home/Home';

import AuthProvider from './context/AuthProvider';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <div>

      <AuthProvider>
        <Router>

          <Switch>
            <Route exact path="/">
              <LogIn></LogIn>
            </Route>
            <Route exact path="/login">
              <LogIn></LogIn>
            </Route>

            <Route path="/registration">
              <Registration></Registration>
            </Route>
            <PrivateRoute path="/home">

              <Home></Home>
            </PrivateRoute>

          </Switch>

        </Router>
      </AuthProvider>


    </div>
  );
}

export default App;
