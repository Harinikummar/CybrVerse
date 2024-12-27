import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./styles.css"; // Ensure that styles for correct and incorrect options are defined

const AdvancedQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");
  const [quizType, setQuizType] = useState("advanced");
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    if (firstName && lastName) {
      setUserName(`${firstName} ${lastName}`);
    }
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/${quizType}Quiz`);
        if (response.data.data && response.data.data.length > 0) {
          setQuestions(response.data.data);
        } else {
          setError("No quizzes available.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        setError("Failed to load quiz data.");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [quizType]);

  const navigate = useNavigate();

  const handleCertificateClick = () => {
    const hasCompletedAdvQuiz = localStorage.getItem('advancedQuizCompleted');
  
    if (hasCompletedAdvQuiz === 'true') {
      navigate('/certificateadv');
    } else {
      alert('Please complete the Advanced Quiz to access your certificate.');
    }
  };

  const handleOptionClick = (option) => {
    const current = questions[currentQuestion];
    setSelectedOption(option);

    if (option === current.answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null); // Reset selected option for the next question
      } else {
        setShowScore(true);

        // Store quiz progress
        const totalQuestions = questions.length;
        const progressPercentage = (score / totalQuestions) * 10;
        localStorage.setItem('AdvQuizProgress', progressPercentage);

        // Set completion flag if passed
        if (score / totalQuestions > 0.5) {
          localStorage.setItem('advancedQuizCompleted', 'true');
        }
      }
    }, 1000); // Delay to show the correct/incorrect colors briefly before moving to the next question
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
  };

  const isPassed = score / questions.length > 0.5;

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!questions || questions.length === 0) {
    return <div>No questions available.</div>;
  }

  const currentQuiz = questions[currentQuestion];

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        {showScore ? (
          <div className="score-section">
            <h2 className="score-header">Result</h2>
            <h3 className="score-details">{userName}, your Score: {score} / {questions.length}</h3>
            {isPassed ? (
              <div className="congratulations">
                <p className="success-message">Congratulations, you have passed!</p>
                <button className="download-button" onClick={handleCertificateClick}>
                  View Certificate
                </button>
              </div>
            ) : (
              <div className="retry">
                <p className="failure-message">You are not eligible for a certificate. Please retake the quiz.</p>
                <button className="retry-button" onClick={handleRestart}>
                  Retake Quiz
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="quiz-question">
            <h3>{currentQuiz.question}</h3>
            <div className="quiz-options">
              {currentQuiz.options.map((option, index) => (
                <button
                  key={index}
                  className={`option-button ${
                    selectedOption
                      ? option === currentQuiz.answer
                        ? "correct"
                        : option === selectedOption
                        ? "incorrect"
                        : ""
                      : ""
                  }`}
                  onClick={() => handleOptionClick(option)}
                  disabled={!!selectedOption} // Disable options once one is selected
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedQuiz;
