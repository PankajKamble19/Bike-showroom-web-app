const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema({
  name:           { type: String, required: true },
  brand:          { type: String, required: true },
  price:          { type: Number, required: true },
  engineCapacity: { type: Number, required: true },
  mileage:        { type: Number, required: true },
  description:    { type: String },
  imageUrl:       { type: String },
  available:      { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Bike", bikeSchema);