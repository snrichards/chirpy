const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    chirps: [Chirp!]
    chirp(id: ID!): Chirp
  }

  extend type Mutation {
    createChirp(text: String!): Chirp!
    updateChirp(id: ID!, text: String!): Chirp!
    deleteChirp(id: ID!): Boolean!
  }

  type Chirp {
    id: ID!
    text: String!
    user: User!
  }
`;
