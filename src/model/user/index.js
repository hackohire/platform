import { attributes } from 'structure'
import uuid from 'uuid/v4'

const currentJobDetails = attributes(
    {
        jobProfile: { type: String },
        companyName: { type: String },
        companyLocation: { type: String },
    }
);

export default attributes({
    _id: { type: String, required: true, default: uuid },
    name: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    sub: { type: String },
    email: { type: String },
    email_verified: { type: Boolean },
    phone: { type: String },
    programming_languages: { type: Array, itemType: String, default: [] },
    // applications: [{ type: Schema.Types.ObjectId, ref: 'Application' }],
    github_url: { type: String },
    linkedin_url: { type: String },
    stackoverflow_url: { type: String },
    portfolio_links: Array,
    location: { type: String },
    currentJobDetails: currentJobDetails,
    avatar: { type: String },
    roles: {
        type: Array,
        itemType: String,
        // enum: ['Developer', 'Admin', 'User'],
        default: ['User'],
    }
})(class User { })


// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const currentJobDetails = new Schema(
//     {
//         jobProfile: String,
//         companyName: String,
//         companyLocation: String
//     }
// );


// const userSchema = new Schema(
//     {
//         firstName: String,
//         lastName: String,
//         name: String,
//         sub: String,
//         email: String,
//         email_verified: Boolean,
//         phone: String,
//         programming_languages: { type: Array, default: [] },
//         applications: [{ type: Schema.Types.ObjectId, ref: 'Application' }],
//         github_url: String,
//         linkedin_url: String,
//         stackoverflow_url: String,
//         portfolio_links: Array,
//         location: String,
//         currentJobDetails: currentJobDetails,
//         avatar: String,
//         roles: {
//             type: [String],
//             enum: ['Developer', 'Admin', 'User'],
//             default: ['User'],

//         }
//     },
//     {
//         timestamps: true,
//         id: true
//     },
// );



// export default () => {
//     try {
//         return mongoose.model('user');
//     } catch (e) {
//         return mongoose.model('user', userSchema);
//     }

// };

