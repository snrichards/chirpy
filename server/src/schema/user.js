const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User!
  }

  extend type Mutation {
    createUser(username: String!, email: String!, password: String!): Token!
    signIn(email: String!, password: String!): Token!
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    chirps: [Chirp!]
  }
`;
