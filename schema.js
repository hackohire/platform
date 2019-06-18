const {gql} = require('apollo-server-lambda');

const schema = `
type User {
  _id: ID!
  name: String
  email: String
}

type Query {
  hello: String
  getUsers(_page: Int, _limit: Int): [User!]!
}

type Mutation {
  createUser(email: String!): [User]
}
`;

module.exports = gql(schema);
