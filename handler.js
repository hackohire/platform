const {ApolloServer} = require('apollo-server-lambda');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const server = new ApolloServer({
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

module.exports.graphqlHandler = server.createHandler();
