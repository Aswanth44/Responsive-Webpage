import React, { useState } from 'react';
import { X, Mail, Phone, Calendar, Tag, Trash2, Save, FileText, CheckCircle2 } from 'lucide-react';

export const SubmissionDetailModal = ({ submission, onClose, onUpdateStatus, onDelete }) => {
  if (!submission) return null;

  const [status, setStatus] = useState(submission.status || 'New');
  const [adminNotes, setAdminNotes] = useState(submission.adminNotes || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    onUpdateStatus(submission.id, { status, adminNotes });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content detail-modal">
        <div className="modal-header">
          <div>
            <span className={`status-badge status-${status.toLowerCase().replace(' ', '-')}`}>
              {status}
            </span>
            <h2 className="modal-title" style={{ marginTop: '6px' }}>{submission.fullName}</h2>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="detail-meta">
          <div className="meta-item">
            <Mail size={15} />
            <a href={`mailto:${submission.email}`}>{submission.email}</a>
          </div>
          <div className="meta-item">
            <Phone size={15} />
            <a href={`tel:${submission.phone}`}>{submission.phone}</a>
          </div>
          <div className="meta-item">
            <Calendar size={15} />
            <span>{new Date(submission.createdAt).toLocaleString()}</span>
          </div>
          <div className="meta-item">
            <Tag size={15} />
            <span>{submission.subject}</span>
          </div>
        </div>

        <div className="detail-section">
          <label className="detail-label">
            <FileText size={16} />
            Message Content
          </label>
          <div className="message-box">{submission.message}</div>
        </div>

        <div className="detail-section edit-section">
          <div className="form-grid">
            <div className="field-group">
              <label htmlFor="modal-status-select" className="field-label">Update Status</label>
              <select
                id="modal-status-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="form-input"
              >
                <option value="New">New</option>
                <option value="In Review">In Review</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <div className="field-group full-width">
              <label htmlFor="modal-admin-notes" className="field-label">Admin Notes</label>
              <textarea
                id="modal-admin-notes"
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add internal notes or resolution comments..."
                rows={3}
                className="form-input"
              />
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="delete-btn-danger" onClick={() => onDelete(submission.id)}>
            <Trash2 size={16} />
            Delete
          </button>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn-secondary" onClick={onClose}>
              Close
            </button>
            <button className="reset-btn" onClick={handleSave} style={{ width: 'auto' }}>
              {isSaved ? (
                <>
                  <CheckCircle2 size={16} style={{ display: 'inline', marginRight: '6px' }} />
                  Saved!
                </>
              ) : (
                <>
                  <Save size={16} style={{ display: 'inline', marginRight: '6px' }} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
