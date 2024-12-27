const express = require("express");
const router = express.Router();
const IntermediateQuiz = require("../models/intermediateQuiz");  // Import the IntermediateQuiz model

// Route to fetch all intermediate quiz questions
router.get("/", async (req, res) => {
  try {
    // Fetch all intermediate quiz questions from the database
    const quizzes = await IntermediateQuiz.find({ topic: "intermediate" });

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
