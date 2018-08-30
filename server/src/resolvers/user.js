module.exports = {
  Query: {
    users: async (parent, args, { models }) => models.User.findAll(),
    user: async (parent, { id }, { models }) => models.User.findById(id),
  },
  Mutation: {
    createUser: async (parent, { username, email, password }, { models }) => {
      const user = await models.User.create({
        username,
        email,
        password,
      });

      return user;
    },
  },
  User: {
    chirps: async (user, args, { models }) =>
      models.Chirp.findAll({ where: { userId: user.id } }),
  },
};
