import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAuthenticated } from '../utils';

const handleSignOut = (history) => {
  localStorage.removeItem('chirpyToken');
  history.push('/');
};

const Navigation = ({ history }) => (
  <nav>
    <ul>
      {!isAuthenticated() && (
        <li>
          <Link to="/signin">Sign In</Link>
        </li>
      )}
      {!isAuthenticated() && (
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
      )}
      {isAuthenticated() && (
        <li>
          <button type="button" onClick={() => handleSignOut(history)}>
            Sign Out
          </button>
        </li>
      )}
    </ul>
  </nav>
);

Navigation.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default withRouter(Navigation);
