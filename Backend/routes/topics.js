const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');

// Get All Topics
router.get('/', async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get a topic by name
router.get('/name/:name', async (req, res) => {
  try {
    const normalizedName = req.params.name.replace(/-/g, ' ').toLowerCase();
    const topic = await Topic.findOne({ name: new RegExp(`^${normalizedName}$`, 'i') });
    
    if (topic) {
      res.json(topic);
    } else {
      res.status(404).json({ message: 'Topic not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching topic details' });
  }
});

module.exports = router;
