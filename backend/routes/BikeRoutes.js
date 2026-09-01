const express = require("express");
const Bike = require("../models/Bike");
const { protect, adminOnly } = require("../middleware/auth");
const router = express.Router();

// GET all bikes (public)
router.get("/", async (req, res) => {
  try {
    const bikes = await Bike.find().sort({ createdAt: -1 });
    res.json(bikes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single bike (public)
router.get("/:id", async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    if (!bike) return res.status(404).json({ message: "Bike not found" });
    res.json(bike);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create bike (admin only)
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const bike = await Bike.create(req.body);
    res.status(201).json(bike);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update bike (admin only)
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const bike = await Bike.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bike) return res.status(404).json({ message: "Bike not found" });
    res.json(bike);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE bike (admin only)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await Bike.findByIdAndDelete(req.params.id);
    res.json({ message: "Bike deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;