import React from 'react';

export const ValidationProgress = ({ completedCount, totalCount }) => {
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="progress-container">
      <div className="progress-header">
        <span>Form Completion</span>
        <span>{completedCount} of {totalCount} fields completed ({percentage}%)</span>
      </div>
      <div 
        className="progress-track"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div 
          className="progress-fill" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
