const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
    },
    {
        timestamps: true,
    },
);

module.exports = () => {
    try {
        return mongoose.model('user');
    } catch (e) {
        return mongoose.model('user', userSchema);
    }
};
