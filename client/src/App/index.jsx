import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignIn from '../SignIn';

const App = () => (
  <Router>
    <div>
      <h1>Chirpy</h1>

      <Route exact path="/signin" component={SignIn} />
    </div>
  </Router>
);

export default App;
