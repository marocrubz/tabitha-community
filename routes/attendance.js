const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: "Name is required" });

  const existing = await User.findOne({ name, timestamp: { $gte: new Date().setHours(0, 0, 0, 0) } });
  if (existing) {
    return res.status(409).json({ message: "Already clocked in today." });
  }

  const newUser = new User({ name });
  await newUser.save();
  res.status(201).json({ message: "Attendance recorded" });
});

module.exports = router;


// GET all clock-ins
router.get('/all', async (req, res) => {
    try {
      const records = await User.find().sort({ timestamp: -1 });
      res.json(records);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching records' });
    }
  });
  