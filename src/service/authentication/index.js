import CognitoUserPool from 'infrastructure/cognito'

const userGroups = Object.freeze({
  user: 'user',
  editor: 'editor',
  admin: 'admin',
})

export default class AuthenticationService {
  constructor(userPool) {
    this.userPool = userPool
  }

  static build() {
    return new AuthenticationService(CognitoUserPool.build(process.env.USER_POOL_ID, process.env.COGNITO_CLIENT_ID))
  }

  login(email, password) {
    return this.userPool.login(email, password)
  }

  async signup(email, password, name) {
    const newUser = await this.userPool.signup(
      email,
      password,
      [
        { Name: 'name', Value: name },
        { Name: 'email', Value: email },
      ],
    )
    await this.userPool.assignUserToGroup(newUser.username, userGroups.user)
    return newUser
  }

  signupConfirm(email, confirmationCode) {
    return this.userPool.signupConfirm(email, confirmationCode)
  }

  resendConfirmationCode(email) {
    return this.userPool.resendConfirmationCode(email)
  }

  async profile(accessToken) {
    const cognitoUser = await this.userPool.user(accessToken)
    const cognitoUserGroup = await this.userPool.userGroup(cognitoUser.sub)
    return { ...cognitoUser, role: cognitoUserGroup }
  }

  logout(accessToken) {
    return this.userPool.logout(accessToken)
  }

  passwordChange(accessToken, oldPassword, newPassword) {
    return this.userPool.passwordChange(accessToken, oldPassword, newPassword)
  }

  passwordForgot(email) {
    return this.userPool.passwordForgot(email)
  }

  passwordForgotConfirm(email, newPassword, confirmationCode) {
    return this.userPool.passwordForgotConfirm(email, newPassword, confirmationCode)
  }

  refreshSession(refreshToken) {
    return this.userPool.refreshSession(refreshToken)
  }
}
