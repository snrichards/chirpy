import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';

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
    redirectToHome: false,
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

    signIn().then((result) => {
      sessionStorage.setItem('chirpyToken', result.data.signIn.token);
      this.setState({
        redirectToHome: true,
      });
    });
  };

  render() {
    const { email, password, redirectToHome } = this.state;
    return redirectToHome || sessionStorage.getItem('chirpyToken') ? (
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

export default SignIn;
