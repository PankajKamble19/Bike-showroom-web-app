const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  review:  { type: String, required: true },
  rating:  { type: Number, min: 1, max: 5, default: 5 },
  bike:    { type: String },
  avatar:  { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Testimonial", testimonialSchema);