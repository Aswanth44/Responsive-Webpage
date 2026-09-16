import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const DeleteConfirmModal = ({ count = 1, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content confirm-modal">
        <div className="delete-badge-icon">
          <AlertTriangle size={32} />
        </div>
        <h3 className="modal-title">Confirm Deletion</h3>
        <p className="modal-subtitle">
          Are you sure you want to delete {count === 1 ? 'this submission' : `these ${count} submissions`}? This action cannot be undone.
        </p>
        <div className="modal-actions" style={{ justifyContent: 'center' }}>
          <button className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="delete-btn-danger" onClick={onConfirm}>
            Yes, Delete {count > 1 ? `(${count})` : ''}
          </button>
        </div>
      </div>
    </div>
  );
};
