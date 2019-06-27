const {getUsers, createUser} = require('./user');
const { createApplication, getApplications, getApplicationById } = require('./application');

module.exports = {
  Query: {
    hello: () => 'Hello world!',
    getUsers,
    getApplications,
    getApplicationById
  },
  Mutation: {
    createUser,
    createApplication
  },
};
