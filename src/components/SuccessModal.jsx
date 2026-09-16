import React from 'react';
import { Check, Send, RotateCcw } from 'lucide-react';

export const SuccessModal = ({ data, onReset }) => {
  if (!data) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content">
        <div className="success-badge-icon">
          <Check size={36} strokeWidth={3} />
        </div>

        <h2 id="modal-title" className="modal-title">Form Submitted Successfully!</h2>
        <p className="modal-subtitle">
          Thank you for reaching out, <strong>{data.fullName}</strong>. We have received your inquiry.
        </p>

        <div className="summary-card">
          <div className="summary-row">
            <span className="summary-label">Full Name:</span>
            <span className="summary-value">{data.fullName}</span>
          </div>

          <div className="summary-row">
            <span className="summary-label">Email Address:</span>
            <span className="summary-value">{data.email}</span>
          </div>

          <div className="summary-row">
            <span className="summary-label">Phone Number:</span>
            <span className="summary-value">{data.phone}</span>
          </div>

          <div className="summary-row">
            <span className="summary-label">Inquiry Topic:</span>
            <span className="summary-value">{data.subject}</span>
          </div>

          <div className="summary-row">
            <span className="summary-label">Message:</span>
            <span className="summary-value">{data.message}</span>
          </div>
        </div>

        <button className="reset-btn" onClick={onReset}>
          <RotateCcw size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
          Submit Another Response
        </button>
      </div>
    </div>
  );
};
