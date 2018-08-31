const { ForbiddenError } = require('apollo-server');
const { skip } = require('graphql-resolvers');

const isAuthenticated = (parent, args, { currentUser }) =>
  currentUser ? skip : new ForbiddenError('Must be signed in.');

const isChirpOwner = async (parent, { id }, { currentUser, models }) => {
  const chirp = await models.Chirp.findById(id);

  if (chirp.userId !== currentUser.id) {
    throw new ForbiddenError('Your are not authorized to edit this chirp.');
  }

  return skip;
};

module.exports = {
  isAuthenticated,
  isChirpOwner,
};
