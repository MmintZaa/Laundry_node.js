const mongoose = require("mongoose");

const Register = new mongoose.Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    id_card: { type: String },
    phone: { type: String },
    email: { type: String },
    clinic_name: { type: String },
    license_number: { type: String },
    confirm_data: { type:Boolean },
    subscribe : { type:Boolean }

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("register", Register);
