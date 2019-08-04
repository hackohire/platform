// import graphqlLambdaServer from 'application/graphqlServer'
import connectToMongoDB from 'infrastructure/mongodb'
import { ACCESS_TOKEN_BEARER } from 'regex'
import { ApolloServer } from 'apollo-server-lambda'
import AuthenticationService from 'service/authentication'
import {
  schema,
  queries,
  mutations,
  directives,
  createLoaders,
  resolvers,
} from '../application'

const allResolvers = {
  Query: queries,
  Mutation: mutations,
  ...resolvers,
}

let db

const runHandler = (event, context, handler) =>
  new Promise((resolve, reject) => {
    const callback = (error, body) => (error ? reject(error) : resolve(body));

    handler(event, context, callback);
  });

const run = async (event, context) => {

  context.callbackWaitsForEmptyEventLoop = false // eslint-disable-line no-param-reassign
  const accessToken = event.headers.Authorization ? event.headers.Authorization.replace(ACCESS_TOKEN_BEARER, '') : undefined


  if (!db) {
    db = await connectToMongoDB()
  }
  console.log(db.id)


  const lambda = new ApolloServer({
    // tracing: true,
    cors: true,
    context: async ({ context }) => {
      const authenticationService = AuthenticationService.build()
      return {
        accessToken: accessToken,
        user: accessToken
          ? await authenticationService.profile(accessToken)
          : undefined,
        db: db,
        loaders: createLoaders(db),
      }
    },
    typeDefs: schema,
    resolvers: allResolvers,
    schemaDirectives: directives,
    introspection: true,
    playground: true,
  })
  const handler = lambda.createHandler({ cors: { credentials: true, origin: '*' } });
  const response = await runHandler(event, context, handler);

  // Destroy your connections here

  return response;
};

export const handle = run;


