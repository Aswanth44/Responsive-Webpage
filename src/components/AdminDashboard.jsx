import React, { useState, useMemo } from 'react';
import { Search, Download, Trash2, Eye, Edit3, Filter, CheckSquare, Square, RefreshCw } from 'lucide-react';
import { DashboardStats } from './DashboardStats';
import { exportToCSV } from '../utils/storage';

export const AdminDashboard = ({
  submissions = [],
  onSelectSubmission,
  onUpdateStatus,
  onDeleteSubmission,
  onBulkDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [topicFilter, setTopicFilter] = useState('All');
  const [selectedIds, setSelectedIds] = useState([]);

  // Filtered dataset based on search & filter state
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      // Status filter
      if (statusFilter !== 'All' && sub.status !== statusFilter) {
        return false;
      }
      // Topic filter
      if (topicFilter !== 'All' && sub.subject !== topicFilter) {
        return false;
      }
      // Search term matching (Name, Email, Subject, Message)
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const nameMatch = sub.fullName.toLowerCase().includes(query);
        const emailMatch = sub.email.toLowerCase().includes(query);
        const subjectMatch = sub.subject.toLowerCase().includes(query);
        const messageMatch = sub.message.toLowerCase().includes(query);
        return nameMatch || emailMatch || subjectMatch || messageMatch;
      }
      return true;
    });
  }, [submissions, searchTerm, statusFilter, topicFilter]);

  // Bulk Selection Handlers
  const isAllSelected =
    filteredSubmissions.length > 0 &&
    filteredSubmissions.every((item) => selectedIds.includes(item.id));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredSubmissions.map((item) => item.id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    onBulkDelete(selectedIds);
    setSelectedIds([]);
  };

  const handleExportCSV = () => {
    exportToCSV(filteredSubmissions);
  };

  return (
    <div className="dashboard-container">
      {/* Metrics Stat Overview */}
      <DashboardStats submissions={submissions} />

      <div className="dashboard-card">
        {/* Dashboard Toolbar */}
        <div className="dashboard-toolbar">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search by name, email, topic, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="toolbar-filters">
            {/* Status Filter */}
            <div className="filter-group">
              <Filter size={15} className="filter-icon" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="In Review">In Review</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            {/* Topic Filter */}
            <select
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Topics</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Project Collaboration">Project Collaboration</option>
              <option value="Technical Support">Technical Support</option>
              <option value="Portfolio Feedback">Portfolio Feedback</option>
            </select>

            {/* Export CSV Button */}
            <button className="btn-export" onClick={handleExportCSV} title="Export filtered records to CSV">
              <Download size={16} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Bulk Action Controls */}
        {selectedIds.length > 0 && (
          <div className="bulk-action-bar">
            <span>{selectedIds.length} item(s) selected</span>
            <button className="delete-btn-danger sm" onClick={handleBulkDelete}>
              <Trash2 size={14} />
              Delete Selected ({selectedIds.length})
            </button>
          </div>
        )}

        {/* Submissions Table - Desktop View */}
        <div className="table-responsive desktop-table-view">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>
                  <button className="checkbox-toggle-btn" onClick={toggleSelectAll}>
                    {isAllSelected ? <CheckSquare size={18} /> : <Square size={18} />}
                  </button>
                </th>
                <th>Name & Email</th>
                <th>Topic</th>
                <th>Date</th>
                <th>Status</th>
                <th>Message Preview</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty-table-cell">
                    <div className="empty-state">
                      <p className="empty-title">No submissions found</p>
                      <p className="empty-sub">Try clearing search or filter constraints.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((sub) => {
                  const isSelected = selectedIds.includes(sub.id);
                  return (
                    <tr key={sub.id} className={isSelected ? 'row-selected' : ''}>
                      <td>
                        <button className="checkbox-toggle-btn" onClick={() => toggleSelectOne(sub.id)}>
                          {isSelected ? <CheckSquare size={18} /> : <Square size={18} />}
                        </button>
                      </td>
                      <td>
                        <div className="table-user-info">
                          <span className="user-name">{sub.fullName}</span>
                          <span className="user-email">{sub.email}</span>
                        </div>
                      </td>
                      <td>
                        <span className="topic-pill">{sub.subject}</span>
                      </td>
                      <td className="date-cell">
                        {new Date(sub.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <span className={`status-badge status-${sub.status.toLowerCase().replace(' ', '-')}`}>
                          {sub.status}
                        </span>
                      </td>
                      <td className="message-preview-cell">
                        <span className="message-preview-text" title={sub.message}>
                          {sub.message}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div className="table-actions">
                          <button
                            className="action-icon-btn view"
                            onClick={() => onSelectSubmission(sub)}
                            title="View & Edit Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            className="action-icon-btn delete"
                            onClick={() => onDeleteSubmission(sub.id)}
                            title="Delete Submission"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Submissions Mobile Card Fallback View */}
        <div className="mobile-cards-view">
          {filteredSubmissions.length === 0 ? (
            <div className="empty-state">
              <p className="empty-title">No submissions found</p>
              <p className="empty-sub">Try clearing search or filter constraints.</p>
            </div>
          ) : (
            filteredSubmissions.map((sub) => (
              <div key={sub.id} className="mobile-sub-card">
                <div className="mobile-card-header">
                  <div>
                    <span className="user-name">{sub.fullName}</span>
                    <span className="user-email">{sub.email}</span>
                  </div>
                  <span className={`status-badge status-${sub.status.toLowerCase().replace(' ', '-')}`}>
                    {sub.status}
                  </span>
                </div>

                <div className="mobile-card-body">
                  <p><strong>Topic:</strong> {sub.subject}</p>
                  <p className="mobile-msg-text">{sub.message}</p>
                  <p className="mobile-date">{new Date(sub.createdAt).toLocaleString()}</p>
                </div>

                <div className="mobile-card-footer">
                  <button className="btn-secondary sm" onClick={() => onSelectSubmission(sub)}>
                    <Eye size={14} /> Details
                  </button>
                  <button className="delete-btn-danger sm" onClick={() => onDeleteSubmission(sub.id)}>
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
