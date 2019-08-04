import { gql } from 'apollo-server'

export default gql`
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

type Mutation {
  authorize(applicationId: String): User
  createUser(user: UserInput!): User
}
`
