import React from "react";
import { useNavigate } from "react-router-dom";
import "./QuizSelection.css"; // Add your CSS file for styling

const QuizSelection = () => {
  const navigate = useNavigate();

  // Navigate to specific quiz pages
  const handleQuizSelect = (quizType) => {
    if (quizType === "basic") {
      navigate("/basicQuiz");
    } else if (quizType === "intermediate") {
      navigate("/intermediateQuiz");
    } else if (quizType === "advanced") {
      navigate("/advancedQuiz");
    }
  };

  return (
    <div className="quiz-selection-container">
      <h1>Cybersecurity Quiz</h1>
      <p>Choose a quiz level to test your skills!</p>

      <div className="quiz-levels">
        <div className="quiz-card basic" onClick={() => handleQuizSelect("basic")}>
          <h2>Basic</h2>
          <p>Start with foundational cybersecurity questions.</p>
        </div>

        <div className="quiz-card intermediate" onClick={() => handleQuizSelect("intermediate")}>
          <h2>Intermediate</h2>
          <p>Take on more advanced challenges.</p>
        </div>

        <div className="quiz-card advanced" onClick={() => handleQuizSelect("advanced")}>
          <h2>Advanced</h2>
          <p>Master-level quiz for professionals.</p>
        </div>
      </div>
    </div>
  );
};

export default QuizSelection;
