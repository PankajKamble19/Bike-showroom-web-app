const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
  bike:    { type: mongoose.Schema.Types.ObjectId, ref: "Bike", required: true },
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  phone:   { type: String },
  message: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Inquiry", inquirySchema);