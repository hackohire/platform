const db = require('./../helpers/db');
const auth = require('./../helpers/auth');
const Application = require('./../models/application')();

let conn;

async function createApplication(_, { application }, { headers }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!conn) {
                console.log('Creating new mongoose connection.');
                conn = await db();
            } else {
                console.log('Using existing mongoose connection.');
            }

            const app = new Application(application);
            await app.save(application).then(async a => {
                console.log(a)
                await Application.find({createdBy: application.createdBy}, (err, apps) => {
                    if(err) {
                        return reject(err);
                    }
                    return resolve(apps);
                })
                return resolve([a]);
            });

            // await conn.close();

            
        } catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}

async function getApplications(_, { userId }, { headers }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!conn) {
                console.log('Creating new mongoose connection.');
                conn = await db();
            } else {
                console.log('Using existing mongoose connection.');
            }

            Application.find({createdBy: userId}, (err, apps) => {
                if(err) {
                    return new Error(err);
                }
                return resolve(apps);
            })

            
        } catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}

async function getApplicationById(_, { id }, { headers }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!conn) {
                console.log('Creating new mongoose connection.');
                conn = await db();
            } else {
                console.log('Using existing mongoose connection.');
            }

            Application.findOne({_id: id}, (err, app) => {
                if(err) {
                    return new Error(err);
                }
                console.log(app);
                return resolve(app);
            })

            
        } catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}

async function getUserApplications(_, { userId }, { headers }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!conn) {
                console.log('Creating new mongoose connection.');
                conn = await db();
            } else {
                console.log('Using existing mongoose connection.');
            }

            Application.find({userId: userId}, (err, apps) => {
                if(err) {
                    return new Error(err);
                }
                console.log(apps);
                return resolve(apps);
            })

            
        } catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}

module.exports = {
    createApplication,
    getApplications,
    getApplicationById,
    getUserApplications
};