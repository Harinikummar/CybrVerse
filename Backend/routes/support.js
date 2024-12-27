const express = require("express");
const SupportQuery = require("../models/SupportQuery"); // Model for Support Queries

const router = express.Router();

// Route to submit a support query
router.post("/", async (req, res) => { // Note: Changed "/submit" to "/"
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Save the query to the database
    const newQuery = new SupportQuery({ name, email, subject, message });
    await newQuery.save();

    return res.status(200).json({ message: "Support query submitted successfully." });
  } catch (error) {
    console.error("Error handling support query:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
