// const mongoose = require('mongoose');

// module.exports = async () => new Promise(async (resolve, reject) => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGODB_URL, {
//             useNewUrlParser: true,

            
//             poolSize: 20,
//             socketTimeoutMS: 480000,
//             keepAlive: 300000,
        
//             keepAliveInitialDelay : 300000,
//             connectTimeoutMS: 30000,
//             reconnectTries: Number.MAX_VALUE,
//             reconnectInterval: 1000,

//         });

//         return resolve(conn);
//     } catch (e) {
//         console.log(e);
//         return reject(e);
//     }
// });

// "use strict";
// const MongoClient = require('mongodb').MongoClient;
// const MONGODB_URI = process.env.MONGODB_URL; // or Atlas connection string

// let cachedDb = null;

// function connectToDatabase () {
//   console.log('=> connect to database');

//   if (cachedDb) {
//     console.log('=> using cached database instance');
//     return Promise.resolve(cachedDb);
//   }

//   return MongoClient.connect(MONGODB_URI)
//     .then(db => {
//       cachedDb = db;
//       return cachedDb;
//     });
// }

const mongoose = require('mongoose');
const bluebird = require('bluebird');
mongoose.Promise = bluebird;
// mongoose.Promise = global.Promise;

// Only reconnect if needed. State is saved and outlives a handler invocation 
let isConnected;

const connectToDatabase = async () => {
  try {
    if (isConnected) {
      console.log('Re-using existing database connection');
      return Promise.resolve();
    }
  
    console.log('Creating new database connection');
    await mongoose.connect(process.env.MONGODB_URL, {
            // poolSize: 20,
            socketTimeoutMS: 480000,
            keepAlive: 300000,
        
            keepAliveInitialDelay : 300000,
            connectTimeoutMS: 30000,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 1000,
    })
      .then(db => {
        isConnected = db.connections[0].readyState;
      }).catch((e) => Promise.reject(e))
  } catch(e) {
        console.log(e);
        return Promise.reject(e);
  }

};

module.exports = connectToDatabase;
