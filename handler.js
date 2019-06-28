const {ApolloServer} = require('apollo-server-lambda');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  cors: true,
  typeDefs,
  resolvers,
  context: ({event, context}) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
  introspection: true,
  playground: true,
});

// exports.graphql = server.createHandler();

module.exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});
