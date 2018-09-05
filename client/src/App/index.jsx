import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Navigation from '../Navigation';

const App = () => (
  <Router>
    <div>
      <h1>Chirpy</h1>
      <Navigation />

      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
    </div>
  </Router>
);

export default App;
