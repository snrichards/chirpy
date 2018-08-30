require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema');
const resolvers = require('./resolvers');
const { models, sequelize } = require('./models');

const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async () => ({
    models,
    currentUser: await models.User.findOne({ where: { username: 'testUser' } }),
  }),
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

  app.listen({ port: 8080 }, () => {
    console.log('listening on port 8080');
  });
});