const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");


const UserSchema = mongoose.Schema({
    //userId: { type: String, default: () => uuid(), unique: true, index: true },
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    id_card: { type: String, required: true },
    email: { type: String },
    clinic_name: { type: String, required: true },
    license_number: { type: String, required: true },
    objective: { type: String},
    confirm_data: { type: Boolean, required: true },
},
{
  timestamps: true,
}
);

const User = mongoose.model("User", UserSchema);


module.exports = User;