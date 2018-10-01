import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { List } from '../Styled';

const GET_USERS = gql`
  {
    users {
      username
      id
    }
  }
`;

const UsersList = () => (
  <Query
    query={GET_USERS}
    context={{ headers: { 'x-token': localStorage.getItem('chirpyToken') } }}
  >
    {({ data }) => {
      if (!data) {
        return null;
      }
      const { users } = data;

      if (!users) {
        return null;
      }

      return (
        <List>
          {users.map((user) => (
            <li data-id={user.id} key={user.id}>
              <Link to={`/user/${user.id}`}>{user.username}</Link>
            </li>
          ))}
        </List>
      );
    }}
  </Query>
);

export default UsersList;
