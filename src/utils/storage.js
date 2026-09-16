/**
 * localStorage Persistence & Management Utilities for Form Submissions
 */

const STORAGE_KEY = 'flexiform_submissions_data';

// Initial sample data for demonstration if localStorage is empty
const INITIAL_DEMO_SUBMISSIONS = [
  {
    id: 'sub_101',
    fullName: 'Sophia Martinez',
    email: 'sophia.martinez@example.com',
    phone: '+1 (555) 234-5678',
    subject: 'Project Collaboration',
    message: 'Hello team, I would like to discuss a potential web design and frontend development collaboration for our upcoming product launch.',
    terms: true,
    status: 'New',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    adminNotes: ''
  },
  {
    id: 'sub_102',
    fullName: 'David Chen',
    email: 'david.chen@techsolutions.io',
    phone: '+1 (555) 876-5432',
    subject: 'Technical Support',
    message: 'Having an issue with responsive layout breakpoints on tablet view. Could you provide guidance on CSS grid container options?',
    terms: true,
    status: 'In Review',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
    adminNotes: 'Assigned to Lead Frontend Engineer for review.'
  },
  {
    id: 'sub_103',
    fullName: 'Emma Watson',
    email: 'emma.w@designhub.org',
    phone: '+44 20 7946 0912',
    subject: 'Portfolio Feedback',
    message: 'Great portfolio project! The real-time validation and clean component structure are very impressive. Keep up the good work.',
    terms: true,
    status: 'Resolved',
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(), // 3 days ago
    adminNotes: 'Feedback acknowledged and sent thank-you note.'
  }
];

/**
 * Retrieve all submissions from localStorage (seeds initial data if empty)
 */
export const getSubmissions = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_SUBMISSIONS));
      return INITIAL_DEMO_SUBMISSIONS;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to parse submissions from localStorage:', error);
    return INITIAL_DEMO_SUBMISSIONS;
  }
};

/**
 * Save a new user submission
 */
export const saveSubmission = (formData) => {
  const current = getSubmissions();
  const newSubmission = {
    id: `sub_${Date.now()}`,
    ...formData,
    status: 'New',
    createdAt: new Date().toISOString(),
    adminNotes: ''
  };

  const updated = [newSubmission, ...current];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

/**
 * Update an existing submission (status, notes, or fields)
 */
export const updateSubmission = (id, updatedFields) => {
  const current = getSubmissions();
  const updated = current.map((item) =>
    item.id === id ? { ...item, ...updatedFields } : item
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

/**
 * Delete a single submission
 */
export const deleteSubmission = (id) => {
  const current = getSubmissions();
  const updated = current.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

/**
 * Delete multiple submissions by ID array
 */
export const deleteMultipleSubmissions = (ids = []) => {
  const current = getSubmissions();
  const updated = current.filter((item) => !ids.includes(item.id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

/**
 * Export submissions array to downloadable CSV file
 */
export const exportToCSV = (submissions, filename = 'form_submissions.csv') => {
  if (!submissions || submissions.length === 0) return;

  const headers = ['ID', 'Full Name', 'Email', 'Phone', 'Subject', 'Status', 'Submitted At', 'Message', 'Admin Notes'];
  
  const rows = submissions.map(s => [
    s.id,
    `"${(s.fullName || '').replace(/"/g, '""')}"`,
    `"${(s.email || '').replace(/"/g, '""')}"`,
    `"${(s.phone || '').replace(/"/g, '""')}"`,
    `"${(s.subject || '').replace(/"/g, '""')}"`,
    `"${(s.status || '').replace(/"/g, '""')}"`,
    `"${new Date(s.createdAt).toLocaleString()}"`,
    `"${(s.message || '').replace(/"/g, '""')}"`,
    `"${(s.adminNotes || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
