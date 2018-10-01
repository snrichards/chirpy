import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { ProfileTitle, List, ChirpItem } from '../Styled';

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
          <ProfileTitle>{user.username}</ProfileTitle>
          <List>
            {user.chirps.map((chirp) => (
              <ChirpItem key={chirp.id}>{chirp.text}</ChirpItem>
            ))}
          </List>
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
