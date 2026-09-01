const express = require("express");
const Accessory = require("../models/Accessory");
const { protect, adminOnly } = require("../middleware/auth");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { type } = req.query;
    const filter = type ? { type } : {};
    const items = await Accessory.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const item = await Accessory.create(req.body);
    res.status(201).json(item);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const item = await Accessory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await Accessory.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;