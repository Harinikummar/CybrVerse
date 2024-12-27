const express = require("express");
const router = express.Router();
const AdvancedQuiz = require("../models/advancedQuiz");  // Import the AdvancedQuiz model

// Route to fetch all advanced quiz questions
router.get("/", async (req, res) => {
  try {
    // Fetch all advanced quiz questions from the database
    const quizzes = await AdvancedQuiz.find({ topic: "advanced" });

    if (quizzes.length === 0) {
      return res.status(404).send({ message: "No quizzes found" });
    }

    // Return the list of quizzes
    res.status(200).send({
      data: quizzes,
      message: "Quizzes fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
