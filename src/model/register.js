const mongoose = require("mongoose");

const Register = new mongoose.Schema(
  {
    name: { type: String, required: true },
    id_card: { type: String, required: true },
    email: { type: String, required: true },
    clinic_name: { type: String, required: true },
    license_number: { type: String, required: true },
    objective: { type: String, required: true },
    confirm_data: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("register", Register);
