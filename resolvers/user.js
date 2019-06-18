const jwt = require('jsonwebtoken');

const db = require('./../helpers/db');
const User = require('./../models/user')();

let conn;

// Set in `environment` of serverless.yml
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;

// Reusable Authorizer function, set on `authorizer` field in serverless.yml
async function auth(headers) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!headers.Authorization) {
        return reject('Unauthorized');
      }

      const tokenParts = headers.Authorization.split(' ');
      const tokenValue = tokenParts[1];

      if (!(tokenParts[0].toLowerCase() === 'bearer' && tokenValue)) {
        // no auth token!
        return reject('Unauthorized');
      }

      jwt.verify(
          tokenValue,
          AUTH0_CLIENT_SECRET,
          {audience: AUTH0_CLIENT_ID, algorithms: ['HS256']},
          (e, decoded) => {
            if (e) {
              console.log('e ', e);

              return reject('Unauthorized');
            }

            return resolve();
          }
      );
    } catch (e) {
      return reject('Unauthorized');
    }
  });
}

async function getUsers(_, {_page = 1, _limit = 10}) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!conn) {
        console.log('Creating new mongoose connection.');
        conn = await db();
      } else {
        console.log('Using existing mongoose connection.');
      }

      const users = await User.find()
          .limit(_limit)
          .skip((_page - 1) * _limit);

      return resolve(users);
    } catch (e) {
      console.log(e);
      return reject(e);
    }
  });
}

async function createUser(_, {email}, {headers}) {
  return new Promise(async (resolve, reject) => {
    try {
      await auth(headers);

      return resolve([{email}]);
    } catch (e) {
      console.log(e);
      return reject(e);
    }
  });
}

module.exports = {
  getUsers,
  createUser,
};
