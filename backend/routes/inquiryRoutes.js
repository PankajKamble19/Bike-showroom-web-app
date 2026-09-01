const express = require("express");
const Inquiry = require("../models/Inquiry");
const { protect, adminOnly } = require("../middleware/auth");
const router = express.Router();

// POST inquiry (public)
router.post("/", async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body);
    res.status(201).json(inquiry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all inquiries (admin only)
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().populate("bike", "name brand").sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;