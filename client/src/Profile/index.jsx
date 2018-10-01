import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { getCurrentUserId } from '../utils';
import CreateChirp from '../CreateChirp';
import { ProfileTitle, List, ChirpItem } from '../Styled';

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
            <ProfileTitle>My Profile</ProfileTitle>
            <CreateChirp refetch={refetch} />
            <List>
              {user.chirps.map((chirp) => (
                <ChirpItem key={chirp.id}>{chirp.text}</ChirpItem>
              ))}
            </List>
          </section>
        );
      }}
    </Query>
  </div>
);

export default Profile;
