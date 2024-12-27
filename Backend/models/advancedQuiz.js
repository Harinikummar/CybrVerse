const mongoose = require("mongoose");

const advancedQuizSchema = new mongoose.Schema({
  topic: {
    type: String,
    enum: ['advanced'], // Ensures the topic is 'advanced'
    required: true
  },
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  options: {
    type: [String],  // Array of options for the quiz question
    required: true,
    validate: [arrayLimit, '{PATH} exceeds the limit of 4 options'] // Ensure there are 4 options
  }
});

// Function to limit the number of options to 4
function arrayLimit(val) {
  return val.length === 4;
}

const AdvancedQuiz = mongoose.model("AdvancedQuiz", advancedQuizSchema);

module.exports = AdvancedQuiz;
