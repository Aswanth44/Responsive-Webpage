import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { DemoNoticeBanner } from './components/DemoNoticeBanner';
import { Form } from './components/Form';
import { AdminDashboard } from './components/AdminDashboard';
import { SuccessModal } from './components/SuccessModal';
import { SubmissionDetailModal } from './components/SubmissionDetailModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import {
  getSubmissions,
  saveSubmission,
  updateSubmission,
  deleteSubmission,
  deleteMultipleSubmissions,
} from './utils/storage';

export const App = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [activeView, setActiveView] = useState('form'); // 'form' | 'dashboard'
  const [submissions, setSubmissions] = useState([]);
  const [submittedData, setSubmittedData] = useState(null);

  // Selected submission for detail view modal
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // Deletion modal state
  const [deleteTarget, setDeleteTarget] = useState(null); // { type: 'single'|'bulk', ids: string[] }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Load submissions from localStorage on mount
  useEffect(() => {
    const loaded = getSubmissions();
    setSubmissions(loaded);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleFormSubmit = (formData) => {
    const updated = saveSubmission(formData);
    setSubmissions(updated);
    setSubmittedData(formData);
  };

  const handleUpdateStatus = (id, updates) => {
    const updated = updateSubmission(id, updates);
    setSubmissions(updated);
    if (selectedSubmission && selectedSubmission.id === id) {
      setSelectedSubmission((prev) => ({ ...prev, ...updates }));
    }
  };

  // Open single delete confirm modal
  const requestSingleDelete = (id) => {
    setDeleteTarget({ type: 'single', ids: [id] });
  };

  // Open bulk delete confirm modal
  const requestBulkDelete = (ids) => {
    setDeleteTarget({ type: 'bulk', ids });
  };

  // Confirm delete handler
  const confirmDelete = () => {
    if (!deleteTarget) return;

    let updated = [];
    if (deleteTarget.type === 'single') {
      updated = deleteSubmission(deleteTarget.ids[0]);
    } else {
      updated = deleteMultipleSubmissions(deleteTarget.ids);
    }

    setSubmissions(updated);
    setDeleteTarget(null);
    if (selectedSubmission && deleteTarget.ids.includes(selectedSubmission.id)) {
      setSelectedSubmission(null);
    }
  };

  const newCount = submissions.filter((s) => s.status === 'New').length;

  return (
    <div className="app-container">
      <div className="main-content">
        <Navigation
          activeView={activeView}
          setActiveView={setActiveView}
          newCount={newCount}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <DemoNoticeBanner />

        {activeView === 'form' ? (
          <>
            <section className="hero-section">
              <h1 className="hero-title">Get in Touch</h1>
              <p className="hero-subtitle">
                Fill out the form below. Instant real-time validation will guide your submission to completion.
              </p>
            </section>

            <Form onSubmitSuccess={handleFormSubmit} />
          </>
        ) : (
          <AdminDashboard
            submissions={submissions}
            onSelectSubmission={setSelectedSubmission}
            onUpdateStatus={handleUpdateStatus}
            onDeleteSubmission={requestSingleDelete}
            onBulkDelete={requestBulkDelete}
          />
        )}

        {/* User Submission Success Dialog */}
        {submittedData && (
          <SuccessModal
            data={submittedData}
            onReset={() => setSubmittedData(null)}
          />
        )}

        {/* Admin Detail Inspector Modal */}
        {selectedSubmission && (
          <SubmissionDetailModal
            submission={selectedSubmission}
            onClose={() => setSelectedSubmission(null)}
            onUpdateStatus={handleUpdateStatus}
            onDelete={requestSingleDelete}
          />
        )}

        {/* Delete Confirmation Modal */}
        {deleteTarget && (
          <DeleteConfirmModal
            count={deleteTarget.ids.length}
            onConfirm={confirmDelete}
            onCancel={() => setDeleteTarget(null)}
          />
        )}
      </div>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} FlexiForm | Responsive Web Form Management Application</p>
      </footer>
    </div>
  );
};

export default App;
