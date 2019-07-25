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
  roles: [String]
  applications: [Application]
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
  roles: [String]
  applications: [ApplicationInput]
}

enum Roles {
  Developer
  Admin
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
  appSecret: String
  createdBy: ID
  uuid: String
  apiKey: String
  application_url: String
  privacy_policy_url: String
  status: ApplicationStatus
}

input ApplicationInput {
  _id: ID
  name: String!
  description: String
  appSecret: String
  createdBy: ID
  uuid: String
  apiKey: String
  application_url: String
  privacy_policy_url: String
  status: ApplicationStatus
}

enum ApplicationStatus {
  Created
  Submitted
  Approved
  Rejected
  Archieved
  Deleted
  Published
  Unpublished
}

type ResendConfirmationCode {
  AttributeName: String
  DeliveryMedium: String
  Destination: String
}


type Query {
  hello: String
  getUsers(_page: Int, _limit: Int): [User!]!
  getSelectedUser(id: String): User!
  getApplications(userId: String): [Application]
  getApplicationById(appId: String): Application
  getUserApplications(userId: String): Application
}

type Mutation {
  createUser(user: UserInput!): User
  updateUser(user: UserInput): User
  createApplication(application: ApplicationInput): [Application]
  updateApplication(application: ApplicationInput, notifyAdmin: Boolean): Application

  login(email: String, password: String): User
  signup(email: String, password: String, name: String): String
  confirmResgistration(email:String, code: String): String
  resendConfirmationCode(email: String): ResendConfirmationCode
  changePassword(email: String, oldPassword: String, newPassword: String): String
  forgotPassword(email: String): String
  confirmPassword(email: String, newPassword: String, verificationCode: String): String

  authorize(applicationId: String): User
}
`;

module.exports = gql(schema);
