const mongoose = require("mongoose");

const Register = new mongoose.Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    phone: { type: String },
    email: { type: String },
    clinic_name: { type: String },
    age: { type: Number },
    license_number: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("register", Register);
