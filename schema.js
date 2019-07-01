const { gql } = require('apollo-server-lambda');

const schema = `
type User {
  _id: ID!
  name: String
  email: String,
  sub: String
  email_verified: Boolean
  programming_languages: [String]
  github_url: String
  linkedin_url: String
  stackoverflow_url: String
  portfolio_links: [String]
  location: String
  currentJobDetails: CurrentJobDetails
  avatar: String
}

input UserInput {
  _id: ID
  name: String
  email: String
  sub: String
  email_verified: Boolean
  programming_languages: [String]
  github_url: String
  linkedin_url: String
  stackoverflow_url: String
  portfolio_links: [String]
  location: String
  currentJobDetails: CurrentJobDetailsInput
  avatar: String
}

input CurrentJobDetailsInput {
  jobProfile: String
  companyName: String
  companyLocation: String
}

type CurrentJobDetails {
  jobProfile: String
  companyName: String
  companyLocation: String
}

type Application {
  _id: ID
  name: String!
  description: String
  appSecret: String,
  createdBy: ID
}

input ApplicationInput {
  _id: ID
  name: String!
  description: String
  appSecret: String
  createdBy: ID
}

type Query {
  hello: String
  getUsers(_page: Int, _limit: Int): [User!]!
  getSelectedUser(id: String): User!
  getApplications(userId: String): [Application]
  getApplicationById(id: String): Application
  getUserApplications(userId: String): Application
}

type Mutation {
  createUser(user: UserInput!): User
  updateUser(user: UserInput): User
  createApplication(application: ApplicationInput): [Application]
}
`;

module.exports = gql(schema);
