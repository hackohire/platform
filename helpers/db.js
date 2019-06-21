const mongoose = require('mongoose');

module.exports = async () => new Promise(async (resolve, reject) => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
        });

        return resolve(conn);
    } catch (e) {
        console.log(e);
        return reject(e);
    }
});
