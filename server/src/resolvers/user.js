const jwt = require('jsonwebtoken');

const createToken = async (user, secret, expiresIn) => {
  const { id, username, email } = user;
  return jwt.sign({ id, username, email }, secret, { expiresIn });
};

module.exports = {
  Query: {
    users: async (parent, args, { models }) => models.User.findAll(),
    user: async (parent, { id }, { models }) => models.User.findById(id),
  },
  Mutation: {
    createUser: async (
      parent,
      { username, email, password },
      { models, secret },
    ) => {
      const user = await models.User.create({
        username,
        email,
        password,
      });

      return { token: createToken(user, secret, '1d') };
    },
  },
  User: {
    chirps: async (user, args, { models }) =>
      models.Chirp.findAll({ where: { userId: user.id } }),
  },
};
