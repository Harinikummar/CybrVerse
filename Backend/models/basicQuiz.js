const mongoose = require("mongoose");

const basicQuizSchema = new mongoose.Schema({
  topic: {
    type: String,
    enum: ['basic'], // Ensures the topic is 'basic'
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

const BasicQuiz = mongoose.model("BasicQuiz", basicQuizSchema);

module.exports = BasicQuiz;
