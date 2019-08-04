import casual from 'casual'
import factoryFactory from 'factoryFactory'

const createLoginInput = ({
  email, password,
}) => ({
  input: {
    email: email || casual.email,
    password: password || casual.password,
  },
})
export const createLoginInputFactory = factoryFactory(createLoginInput)

const createSignupInput = ({
  email, password, name,
}) => ({
  input: {
    email: email || casual.email,
    password: password || casual.password,
    name: name || casual.first_name,
  },
})
export const createSignupInputFactory = factoryFactory(createSignupInput)

const createPasswordChangeInput = ({
  oldPassword, newPassword,
}) => ({
  input: {
    oldPassword: oldPassword || casual.password,
    newPassword: newPassword || casual.password,
  },
})
export const createPasswordChangeInputFactory = factoryFactory(createPasswordChangeInput)

const createSignupConfirmInput = ({
  email, confirmationCode,
}) => ({
  input: {
    email: email || casual.email,
    confirmationCode: confirmationCode || casual.word,
  },
})
export const createSignupConfirmInputFactory = factoryFactory(createSignupConfirmInput)

const createResendConfirmationCodeInput = ({
  email,
}) => ({
  input: {
    email: email || casual.email,
  },
})
export const createResendConfirmationCodeInputFactory = factoryFactory(createResendConfirmationCodeInput)

const createPasswordForgotInput = ({
  email,
}) => ({
  input: {
    email: email || casual.email,
  },
})
export const createPasswordForgotInputFactory = factoryFactory(createPasswordForgotInput)

const createPasswordForgotConfirmInput = ({
  email, confirmationCode, newPassword,
}) => ({
  input: {
    email: email || casual.email,
    confirmationCode: confirmationCode || casual.word,
    newPassword: newPassword || casual.password,
  },
})
export const createPasswordForgotConfirmInputFactory = factoryFactory(createPasswordForgotConfirmInput)

const createRefreshSessionInput = ({
  refreshToken,
}) => ({
  input: {
    refreshToken: refreshToken || casual.uuid,
  },
})
export const createRefreshSessionInputFactory = factoryFactory(createRefreshSessionInput)
