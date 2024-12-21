const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add a username"]
    },
    email: {
        type: String,
        required: [true, "Please add an email"]
    },
    password: {
        type: String,
        required: [true, "Please add a password"]
    },
    contacts: [{
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }, 
        mobile: {
            type: Number,
            required: true
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
