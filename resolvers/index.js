const {getUsers, createUser, updateUser} = require('./user');
const { createApplication, getApplications, getApplicationById, updateApplication } = require('./application');

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
    updateApplication
  },
};
