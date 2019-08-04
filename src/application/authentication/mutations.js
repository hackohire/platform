import AuthenticationService from 'service/authentication'

export default {
  login: (_, { input }) => {
    const { email, password } = input
    const authenticationService = AuthenticationService.build()
    return authenticationService.login(email, password)
  },

  signup: (_, { input }) => {
    const { email, password, name } = input
    const authenticationService = AuthenticationService.build()
    return authenticationService.signup(email, password, name)
  },

  signupConfirm: (_, { input }) => {
    const { email, confirmationCode } = input
    const authenticationService = AuthenticationService.build()
    return authenticationService.signupConfirm(email, confirmationCode)
  },

  resendConfirmationCode: (_, { input }) => {
    const { email } = input
    const authenticationService = AuthenticationService.build()
    return authenticationService.resendConfirmationCode(email)
  },

  passwordChange: (_, { input }, { accessToken }) => {
    const { oldPassword, newPassword } = input
    const authenticationService = AuthenticationService.build()
    return authenticationService.passwordChange(accessToken, oldPassword, newPassword)
  },

  logout: (_, __, { accessToken }) => {
    const authenticationService = AuthenticationService.build()
    return authenticationService.logout(accessToken)
  },

  passwordForgot: (_, { input }) => {
    const { email } = input
    const authenticationService = AuthenticationService.build()
    return authenticationService.passwordForgot(email)
  },

  passwordForgotConfirm: (_, { input }) => {
    const { email, newPassword, confirmationCode } = input
    const authenticationService = AuthenticationService.build()
    return authenticationService.passwordForgotConfirm(email, newPassword, confirmationCode)
  },

  refreshSession: (_, { input }) => {
    const { refreshToken } = input
    const authenticationService = AuthenticationService.build()
    return authenticationService.refreshSession(refreshToken)
  },
}
