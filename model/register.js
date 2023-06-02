const mongoose = require("mongoose");

const Register = new mongoose.Schema(
  {
    name: { type: String },
    id_card: { type: String },
    email: { type: String },
    clinic_name: { type: String },
    license_number: { type: String },
    objecttive: { type: String },
    confirm_data: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("register", Register);
