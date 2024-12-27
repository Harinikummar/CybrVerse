const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true 
  },
  basic: { 
    type: Number, 
    default: 0 
  },
  intermediate: { 
    type: Number, 
    default: 0 
  },
  advanced: { 
    type: Number, 
    default: 0 
  }
});

const QuizResult = mongoose.model("QuizResult", quizResultSchema);

module.exports = QuizResult;