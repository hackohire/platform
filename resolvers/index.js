const {getUsers, createUser} = require('./user');

module.exports = {
  Query: {
    hello: () => 'Hello world!',
    getUsers,
  },
  Mutation: {
    createUser,
  },
};
