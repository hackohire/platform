const {getUsers, createUser, updateUser} = require('./user');
const { createApplication, getApplications, getApplicationById, updateApplication } = require('./application');
const { login, signup, confirmResgistration, resendConfirmationCode, changePassword, forgotPassword, confirmPassword, authorize } = require('./auth')
module.exports = {
  Query: {
    hello: () => 'Hello world!',
    getUsers,
    getApplications,
    getApplicationById
  },
  Mutation: {
    createUser,
    updateUser,
    createApplication,
    updateApplication,


    login,
    signup,
    confirmResgistration,
    resendConfirmationCode,
    changePassword,
    forgotPassword,
    confirmPassword,

    authorize
  },
};
