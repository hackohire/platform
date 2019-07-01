const db = require('./../helpers/db');
const auth = require('./../helpers/auth');
const User = require('./../models/user')();

let conn;

async function getUsers(_, { _page = 1, _limit = 10 }, { headers }) {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log(headers);
            // await auth.auth(headers);

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

async function createUser(_, { user }, { headers }) {
    return new Promise(async (resolve, reject) => {
        try {

            await auth.auth(headers);
            if (!conn) {
                console.log('Creating new mongoose connection.');
                conn = await db();
            } else {
                console.log('Using existing mongoose connection.');
            }

            User.findOne({email: user.email}, async (err, u) => {
                if(err) {
                    return (err);
                }

                if(u) {
                    return resolve(u);
                }
                
                const userToBeSaved = await new User(user);
                await userToBeSaved.save(userToBeSaved).then(userCreated => {
                    console.log(userCreated)
                    return resolve(userCreated);
                });
                
            });

            // await db().then(d => d.close());



            
        } catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}

async function updateUser(_, { user }, { headers }) {
    return new Promise(async (resolve, reject) => {
        try {
            // await auth(headers);

            if (!conn) {
                console.log('Creating new mongoose connection.');
                conn = await db();
            } else {
                console.log('Using existing mongoose connection.');
            }

            // const userToBeSaved = await new User(user);
            await User.findByIdAndUpdate(user._id, user, {new:true}).then(userCreated => {
                console.log(userCreated)
                return resolve(userCreated);
            });
        } catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
};
