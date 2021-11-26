const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema({
    userId: {
        type: String,
        required: true
    },

    token: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('refreshToken', refreshTokenSchema);