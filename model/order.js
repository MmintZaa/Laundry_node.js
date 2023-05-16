const mongoose = require("mongoose");

const Order = new mongoose.Schema(
  {
    order_id: { type: String },
    firstname: { type: String },
    total: { type: Number },
    detail: { type: Object },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", Order);
