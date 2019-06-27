const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        name: String,
        sub: String,
        email: String,
        email_verified: Boolean,
        phone: String,
        programming_languages: Array,
        github_url: String,
        linkedin_url: String,
        stackoverflow_url: String,
        portfolio_links: Array,
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
