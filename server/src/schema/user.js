const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User!
  }

  extend type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    chirps: [Chirp!]
  }
`;
