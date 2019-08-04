import { gql } from 'apollo-server'

export default gql`

enum Role {
  user
  editor
  admin
}

type Authentication {
  username: ID
  nextStep: String
  refreshToken: String
  accessToken: String
  accessTokenExpiresAt: String
  idToken: String
  idTokenExpiresAt: String
}

input AuthenticationInput {
  username: ID
  accessToken: String!
  idToken: String!
}

input LoginInput {
  email: String!
  password: String!
}

input SignupInput {
  email: String!
  password: String!
  name: String!
}

input PasswordChangeInput {
  oldPassword: String!
  newPassword: String!
}

input SignupConfirmInput {
  email: String!
  confirmationCode: String!
}

input ResendConfirmationCodeInput {
  email: String!
}

input PasswordForgotInput {
  email: String!
}

input PasswordForgotConfirmInput {
  email: String!
  confirmationCode: String!
  newPassword: String!
}

input RefreshSessionInput {
  refreshToken: String!
}

directive @auth(
  role: String
) on FIELD_DEFINITION

type Mutation {
  login(input: LoginInput!): Authentication
  signup(input: SignupInput!): Authentication
  signupConfirm(input: SignupConfirmInput!): Boolean
  resendConfirmationCode(input: ResendConfirmationCodeInput!): Boolean
  passwordChange(input: PasswordChangeInput!): Boolean @auth(role:admin)
  passwordForgot(input: PasswordForgotInput!): Boolean
  passwordForgotConfirm(input: PasswordForgotConfirmInput!): Boolean
  refreshSession(input:RefreshSessionInput!): Authentication
  logout: Boolean
}
`
