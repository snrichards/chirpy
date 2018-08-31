const { combineResolvers } = require('graphql-resolvers');
const { isAuthenticated } = require('./authorization');

module.exports = {
  Query: {
    chirps: async (parent, args, { models }) => models.Chirp.findAll(),
    chirp: async (parent, { id }, { models }) => models.Chirp.findById(id),
  },
  Mutation: {
    createChirp: combineResolvers(
      isAuthenticated,
      async (parent, { text }, { currentUser, models }) =>
        models.Chirp.create({
          text,
          userId: currentUser.id,
        }),
    ),
  },
  Chirp: {
    user: async (chirp, args, { models }) => models.User.findById(chirp.userId),
  },
};
