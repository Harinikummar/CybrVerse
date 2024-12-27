import React, { useState, useEffect } from 'react';
import profile from '../images/icon/profile-pic.png';
import SkillProgress from './progress';
import './style.css';

function Dashboard() {
  const [courseProgress, setCourseProgress] = useState({
    basic: 0,
    intermediate: 0,
    advanced: 0,
  });
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Get current user details
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    const userId = localStorage.getItem("userId"); // Assume a unique ID is stored for each user

    if (firstName && lastName) {
      setUserName(`${firstName} ${lastName}`);
    }

    // Check if this is a new user
    const lastLoggedInUser = localStorage.getItem("lastLoggedInUser");
    if (userId && lastLoggedInUser !== userId) {
      // Reset progress for the new user
      localStorage.removeItem('basicQuizProgress');
      localStorage.removeItem('IntQuizProgress');
      localStorage.removeItem('AdvQuizProgress');
      
      // Update the last logged-in user
      localStorage.setItem("lastLoggedInUser", userId);

      // Reset the progress state
      setCourseProgress({
        basic: 0,
        intermediate: 0,
        advanced: 0,
      });
    } else {
      // Retrieve progress for the current user
      const basicQuizProgress = localStorage.getItem('basicQuizProgress');
      const intermediateQuizProgress = localStorage.getItem('IntQuizProgress');
      const advancedQuizProgress = localStorage.getItem('AdvQuizProgress');

      setCourseProgress({
        basic: basicQuizProgress ? parseFloat(basicQuizProgress) : 0,
        intermediate: intermediateQuizProgress ? parseFloat(intermediateQuizProgress) : 0,
        advanced: advancedQuizProgress ? parseFloat(advancedQuizProgress) : 0,
      });
    }
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className='Dashboard'>
      <div className="dashboard-container">
        <h1>My Learning</h1>
        <section className="user-info">
          <img src={profile} alt="profile" className="profile-pic" />
          <h2>Welcome, {userName}</h2>
        </section>

        <section className="progress-section">
          <h2>Your Progress</h2>
          <SkillProgress skill="Basic" level={courseProgress.basic} />
          <SkillProgress skill="Intermediate" level={courseProgress.intermediate} />
          <SkillProgress skill="Advanced" level={courseProgress.advanced} />
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
