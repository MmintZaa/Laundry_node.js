const mongoose = require("mongoose");

const Register = new mongoose.Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    id_card: { type: Number },
    phone: { type: String },
    email: { type: String },
    clinic_name: { type: String },
    license_number: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("register", Register);
