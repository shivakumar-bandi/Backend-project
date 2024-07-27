const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'], // Define roles here
        default: 'user' // Default to 'user' if no role is specified
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
