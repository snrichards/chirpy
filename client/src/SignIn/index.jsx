import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAuthenticated } from '../utils';

const GET_USER = gql`
  mutation($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
    }
  }
`;

class SignIn extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = (event) => {
    const {
      target: { name, value },
    } = event;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event, signIn) => {
    event.preventDefault();
    const { history } = this.props;

    signIn().then((result) => {
      localStorage.setItem('chirpyToken', result.data.signIn.token);
      history.push('/');
    });
  };

  render() {
    const { email, password } = this.state;

    return isAuthenticated() ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Mutation mutation={GET_USER} variables={{ email, password }}>
          {(signIn) => (
            <form onSubmit={(event) => this.handleSubmit(event, signIn)}>
              <label htmlFor="email">
                Email:
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="password">
                Password:
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={this.handleChange}
                />
              </label>
              <button type="submit">Sign In</button>
            </form>
          )}
        </Mutation>
      </div>
    );
  }
}

SignIn.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default withRouter(SignIn);
