import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAuthenticated } from '../utils';
import Input from '../Input';

const SIGN_UP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

class SignUp extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirm: '',
  };

  handleChange = (event) => {
    const {
      target: { name, value },
    } = event;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event, signUp) => {
    event.preventDefault();
    const { history } = this.props;

    signUp().then((result) => {
      localStorage.setItem('chirpyToken', result.data.createUser.token);
      history.push('/');
    });
  };

  render() {
    const { username, email, password, confirm } = this.state;
    return isAuthenticated() ? (
      <Redirect to="/" />
    ) : (
      <Mutation
        mutation={SIGN_UP_USER}
        variables={{ username, email, password }}
      >
        {(signUp) => (
          <form onSubmit={(event) => this.handleSubmit(event, signUp)}>
            {/* <label htmlFor="username">
              Username:
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={this.handleChange}
              />
            </label> */}
            <Input
              title="Username"
              id="username"
              name="username"
              type="text"
              value={username}
              handleChange={this.handleChange}
            />
            <Input
              title="Email"
              id="email"
              name="email"
              type="email"
              value={email}
              handleChange={this.handleChange}
            />
            <Input
              title="Password"
              id="password"
              name="password"
              type="password"
              value={password}
              handleChange={this.handleChange}
            />
            <Input
              title="Confirm password"
              id="confirm-password"
              name="confirm"
              type="password"
              value={confirm}
              handleChange={this.handleChange}
            />

            {/* <label htmlFor="email">
              Email:
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={this.handleChange}
              />
            </label> */}
            {/* <label htmlFor="password">
              Password:
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={this.handleChange}
              />
            </label> */}
            {/* <label htmlFor="confirm">
              Confirm password:
              <input
                id="confirm-password"
                name="confirm"
                type="password"
                value={confirm}
                onChange={this.handleChange}
              />
            </label> */}
            <button type="submit">Sign Up</button>
          </form>
        )}
      </Mutation>
    );
  }
}

SignUp.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default withRouter(SignUp);
