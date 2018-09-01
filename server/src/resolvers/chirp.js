const { combineResolvers } = require('graphql-resolvers');
const { isAuthenticated, isChirpOwner } = require('./authorization');

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
    updateChirp: combineResolvers(
      isAuthenticated,
      isChirpOwner,
      async (parent, { id, text }, { models }) => {
        const [, [updatedChirp]] = await models.Chirp.update(
          { text },
          { where: { id }, returning: true },
        );

        return updatedChirp;
      },
    ),
    deleteChirp: combineResolvers(
      isAuthenticated,
      isChirpOwner,
      async (parent, { id }, { models }) =>
        models.Chirp.destroy({ where: { id } }),
    ),
  },
  Chirp: {
    user: async (chirp, args, { models }) => models.User.findById(chirp.userId),
  },
};
