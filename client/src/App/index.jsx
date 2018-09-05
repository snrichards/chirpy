import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Navigation from '../Navigation';
import Profile from '../Profile';
import PrivateRoute from '../PrivateRoute';
import { isAuthenticated } from '../utils';
import FourOhFour from '../FourOhFour';
import UsersList from '../UsersList';
import User from '../User';

const App = () => (
  <Router>
    <div>
      <header>
        <h1>Chirpy</h1>
        <Navigation />
      </header>
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            isAuthenticated() ? (
              <Redirect to="/profile" />
            ) : (
              <Redirect to="/signup" />
            )
          }
        />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <PrivateRoute exact path="/users" component={UsersList} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/user/:id" component={User} />
        <Route component={FourOhFour} />
      </Switch>
    </div>
  </Router>
);

export default App;
