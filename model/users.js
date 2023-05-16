const mongoose = require('mongoose');

const Users = new mongoose.Schema({
    user_id: { type: String },
    username: { type: String },
    password: { type: String },
    fristname: { type: String },
    lastname: { type: String },
    age: { type: Number },
    sex: { type: String}

}, {
    timestamps: true
});

module.exports = mongoose.model('users', Users)

