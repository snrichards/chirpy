import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { getCurrentUserId } from '../utils';
import CreateChirp from '../CreateChirp';

const GET_CURRENT_USER = gql`
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

const Profile = () => (
  <div>
    <Query query={GET_CURRENT_USER} variables={{ id: getCurrentUserId() }}>
      {({ data, refetch }) => {
        const { user } = data;

        if (!user) {
          return null;
        }

        return (
          <section>
            <h2>{`${user.username}'s Profile`}</h2>
            <CreateChirp refetch={refetch} />
            <ul>
              {user.chirps.map((chirp) => (
                <li key={chirp.id}>{chirp.text}</li>
              ))}
            </ul>
          </section>
        );
      }}
    </Query>
  </div>
);

export default Profile;
