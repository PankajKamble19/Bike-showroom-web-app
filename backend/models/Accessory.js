const mongoose = require("mongoose");

const accessorySchema = new mongoose.Schema({
  name:        { type: String, required: true },
  category:    { type: String, enum: ["helmet", "gloves", "jacket", "boots", "knee-guard", "mirror", "other"], required: true },
  type:        { type: String, enum: ["accessory", "gear"], default: "accessory" },
  price:       { type: Number, required: true },
  description: { type: String },
  imageUrl:    { type: String },
  inStock:     { type: Boolean, default: true },
  brand:       { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Accessory", accessorySchema);