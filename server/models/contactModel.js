const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    fullname: String,
    email: { type: String, required: true },
    phone: String,
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Contact", contactSchema);
