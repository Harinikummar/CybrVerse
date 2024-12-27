import React from 'react';

const SkillProgress = ({ skill, level }) => {
  return (
    <div className="skill-progress-container">
      <div className="skill-label">
        <strong>{skill}</strong>
      </div>
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${level}%` }}
        ></div>
      </div>
      <div className="progress-labels">
        <span>Beginner</span>
        <span>Intermediate</span>
        <span>Advanced</span>
      </div>
    </div>
  );
};

export default SkillProgress;
