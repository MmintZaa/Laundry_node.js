const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");


const UserSchema = mongoose.Schema({
    userId: { type: String, default: () => uuid(), unique: true, index: true },
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    email: { type: String, require: true },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
});

const User = mongoose.model("User", UserSchema);


module.exports = User;