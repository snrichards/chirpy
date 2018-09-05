import React, { Fragment } from 'react';
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
        <Fragment>
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </Fragment>
      )}
      {isAuthenticated() && (
        <Fragment>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <button type="button" onClick={() => handleSignOut(history)}>
              Sign Out
            </button>
          </li>
        </Fragment>
      )}
    </ul>
  </nav>
);

Navigation.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default withRouter(Navigation);
