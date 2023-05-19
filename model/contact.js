const mongoose = require("mongoose");

const Contact = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    subject: { type: String },
    message: { type: String }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contact", Contact);
