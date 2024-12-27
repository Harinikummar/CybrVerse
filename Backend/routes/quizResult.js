const express = require("express");
const mongoose = require("mongoose");
const QuizResult = require("../models/quizResult"); // Assuming your model is in the models folder

const router = express.Router();

// Route to update quiz score
router.post("/updateQuizResult", async (req, res) => {
  const { userId, score, totalQuestions, quizType } = req.body;

  if (!userId || score === undefined || totalQuestions === undefined || !quizType) {
    return res.status(400).json({ message: "User ID, score, totalQuestions, and quizType are required" });
  }

  const passingScore = totalQuestions * 0.5; // 50% of the total questions

  try {
    // Check if the score is above 50%
    if (score > passingScore) {
      // Check if the user already has an entry in the QuizResult collection
      const quizResult = await QuizResult.findOne({ userId });

      if (quizResult) {
        // Update the appropriate field based on quizType
        if (quizType === "basic") {
          quizResult.basic = score;
        } else if (quizType === "intermediate") {
          quizResult.intermediate = score;
        } else if (quizType === "advanced") {
          quizResult.advanced = score;
        }
        await quizResult.save();
        return res.status(200).json({ message: "Quiz result updated successfully" });
      } else {
        // If no quiz result exists, create a new one with the appropriate quizType field
        const newQuizResult = new QuizResult({
          userId,
          [quizType]: score, // Dynamically assign the quiz type field
        });
        await newQuizResult.save();
        return res.status(200).json({ message: "Quiz result created and saved successfully" });
      }
    } else {
      return res.status(400).json({ message: "Score is below the passing threshold" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating quiz result" });
  }
});

module.exports = router;
