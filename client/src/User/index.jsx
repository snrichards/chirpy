import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_USER = gql`
  query($id: ID!) {
    user(id: $id) {
      username
      chirps {
        text
        id
      }
    }
  }
`;

const User = ({ match }) => (
  <Query query={GET_USER} variables={{ id: match.params.id }}>
    {({ data }) => {
      if (!data) {
        return null;
      }

      const { user } = data;

      if (!user) {
        return null;
      }

      return (
        <div>
          {user.username}
          <ul>
            {user.chirps.map((chirp) => (
              <li key={chirp.id}>{chirp.text}</li>
            ))}
          </ul>
        </div>
      );
    }}
  </Query>
);

User.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default User;
