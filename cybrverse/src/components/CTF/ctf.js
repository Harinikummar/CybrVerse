import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css"; // Add your CSS file for styling

const QuizSelection = () => {
  const navigate = useNavigate();

  // Navigate to specific quiz pages
 
  return (
    <div className="quiz-selection-container">
      <h1>Capture The Flag</h1>
      <p>Test your skills!</p>

      <div className="quiz-levels">
        <div className="quiz-card basic" >
          <a href="https://capturetheflag.withgoogle.com/challenges" target="_blank" rel="noopener noreferrer">
          Basic</a>
        </div>

        <div className="quiz-card intermediate" >
        <a href="https://picoctf.org/" target="_blank" rel="noopener noreferrer">
        Intermediate</a>
         
        </div>

        <div className="quiz-card advanced" >
        <a href="https://www.hackthebox.com/hacker/ctf" target="_blank" rel="noopener noreferrer">
        Advanced</a>
         
        </div>
      </div>
    </div>
  );
};

export default QuizSelection;
