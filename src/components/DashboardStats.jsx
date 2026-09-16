import React from 'react';
import { Inbox, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export const DashboardStats = ({ submissions = [] }) => {
  const total = submissions.length;
  const newCount = submissions.filter((s) => s.status === 'New').length;
  const reviewCount = submissions.filter((s) => s.status === 'In Review').length;
  const resolvedCount = submissions.filter((s) => s.status === 'Resolved').length;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon total">
          <Inbox size={22} />
        </div>
        <div className="stat-info">
          <span className="stat-label">Total Submissions</span>
          <span className="stat-value">{total}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon new">
          <AlertCircle size={22} />
        </div>
        <div className="stat-info">
          <span className="stat-label">New / Pending</span>
          <span className="stat-value">{newCount}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon review">
          <Clock size={22} />
        </div>
        <div className="stat-info">
          <span className="stat-label">Under Review</span>
          <span className="stat-value">{reviewCount}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon resolved">
          <CheckCircle2 size={22} />
        </div>
        <div className="stat-info">
          <span className="stat-label">Resolved</span>
          <span className="stat-value">{resolvedCount}</span>
        </div>
      </div>
    </div>
  );
};
