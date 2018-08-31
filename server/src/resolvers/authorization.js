const { ForbiddenError } = require('apollo-server');
const { skip } = require('graphql-resolvers');

const isAuthenticated = (parent, args, { currentUser }) =>
  currentUser ? skip : new ForbiddenError('Must be signed in.');

module.exports = {
  isAuthenticated,
};
