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

const mongoose = require('mongoose');
const bluebird = require('bluebird');
mongoose.Promise = bluebird;
mongoose.Promise = global.Promise;

// Only reconnect if needed. State is saved and outlives a handler invocation 
let isConnected;

const connectToDatabase = async () => {
  try {
    if (isConnected) {
      console.log('Re-using existing database connection');
      return Promise.resolve();
    }
  
    console.log('Creating new database connection');
    await mongoose.connect(process.env.MONGODB_URL)
      .then(db => {
        isConnected = db.connections[0].readyState;
      }).catch((e) => Promise.reject(e))
  } catch(e) {
        console.log(e);
        return Promise.reject(e);
  }

};

module.exports = connectToDatabase;
