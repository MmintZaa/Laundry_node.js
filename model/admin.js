const mongoose = require("mongoose");

const Admin = new mongoose.Schema(
  {
    username: { type: String },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("admin", Admin);
