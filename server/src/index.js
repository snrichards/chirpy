require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const schema = require('./schema');
const resolvers = require('./resolvers');
const { models, sequelize } = require('./models');

const app = express();
app.use(cors());

const getCurrentUser = async (req) => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError(
        'Your session has expired, please sign in again.',
      );
    }
  }

  return null;
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req }) => {
    const currentUser = await getCurrentUser(req);

    return {
      models,
      currentUser,
      secret: process.env.SECRET,
    };
  },
});

server.applyMiddleware({ app, path: '/graphql' });

const eraseDatabaseOnSync = true;

const createTestUser = async () => {
  await models.User.create(
    {
      username: 'testUser',
      email: 'test@example.com',
      password: 'password',
      chirps: [
        {
          text: 'first.',
        },
      ],
    },
    {
      include: [models.Chirp],
    },
  );
};

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createTestUser();
  }

  app.listen({ port: 3000 }, () => {
    console.log('listening on port 8080');
  });
});
