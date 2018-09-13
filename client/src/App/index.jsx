import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  browserHistory,
  Link,
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
import { Header, Container } from '../Styled';

const App = () => (
  <Router history={browserHistory}>
    <Container>
      <Header>
        <h1>
          <Link to="/">Chirpy</Link>
        </h1>
        <Navigation />
      </Header>
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
    </Container>
  </Router>
);

export default App;
