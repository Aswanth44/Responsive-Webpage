import React, { useState } from 'react';
import { Info, X, Database } from 'lucide-react';

export const DemoNoticeBanner = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="demo-notice-banner" role="region" aria-label="Demo architecture notice">
      <div className="demo-notice-content">
        <Database size={18} className="demo-icon" />
        <span>
          <strong>Portfolio Demo Mode:</strong> Submissions are stored locally using browser <code>localStorage</code>. For real multi-user access and enterprise security, integration with a backend server (Node.js/Express) and database (PostgreSQL/MongoDB) is required.
        </span>
      </div>
      <button 
        className="demo-dismiss-btn" 
        onClick={() => setDismissed(true)}
        aria-label="Dismiss notice"
        title="Dismiss notice"
      >
        <X size={16} />
      </button>
    </div>
  );
};
