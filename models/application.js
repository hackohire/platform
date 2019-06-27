const mongoose = require('mongoose');
const { Schema } = mongoose;

const applicationSchema = new Schema(
    {
        name: String,
        description: String,
        appSecret: String,
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            // required: true
        }
    },
    {
        timestamps: true,
    },
);

module.exports = () => {
    try {
        return mongoose.model('application');
    } catch (e) {
        return mongoose.model('application', applicationSchema);
    }
};
