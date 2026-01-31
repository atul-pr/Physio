import { useState, useEffect } from "react";

export default function BackendStatus() {
  const [status, setStatus] = useState("checking");
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const check = async () => {
      try {
        const base = import.meta.env.VITE_API_URL || "";
        const res = await fetch(`${base}/api/health`, {
          method: "GET",
          headers: { Accept: "application/json" },
        });
        setStatus(res.ok ? "ok" : "error");
      } catch {
        setStatus("error");
      }
    };
    check();
    
    // Check every 30 seconds
    const interval = setInterval(check, 30000);
    return () => clearInterval(interval);
  }, []);

  if (status === "ok" || status === "checking" || dismissed) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600&display=swap');
        
        .backend-status-wrapper {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9999;
          animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .backend-status-card {
          font-family: 'Inter', sans-serif;
          background: white;
          border: 2px solid #fca5a5;
          border-radius: 16px;
          padding: 1.25rem 1.5rem;
          box-shadow: 0 10px 25px -5px rgba(239, 68, 68, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          max-width: 360px;
          position: relative;
        }
        
        .backend-status-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }
        
        .backend-status-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          color: #dc2626;
        }
        
        .backend-status-icon {
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .backend-status-close {
          background: none;
          border: none;
          color: #9ca3af;
          font-size: 1.25rem;
          cursor: pointer;
          padding: 0.25rem;
          line-height: 1;
          transition: color 0.2s ease;
        }
        
        .backend-status-close:hover {
          color: #dc2626;
        }
        
        .backend-status-message {
          color: #475569;
          font-size: 0.875rem;
          line-height: 1.5;
          margin-bottom: 1rem;
        }
        
        .backend-status-code {
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 0.5rem 0.75rem;
          font-family: 'Monaco', 'Courier New', monospace;
          font-size: 0.8125rem;
          color: #334155;
          margin-bottom: 0.75rem;
          overflow-x: auto;
        }
        
        .backend-status-action {
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
          transition: all 0.3s ease;
        }
        
        .backend-status-action:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
        }
        
        @media (max-width: 480px) {
          .backend-status-wrapper {
            left: 10px;
            right: 10px;
            bottom: 10px;
          }
          
          .backend-status-card {
            max-width: none;
            padding: 1rem;
          }
        }
      `}</style>

      <div className="backend-status-wrapper">
        <div className="backend-status-card">
          <div className="backend-status-header">
            <div className="backend-status-title">
              <div className="backend-status-icon">⚠️</div>
              <span>Backend Disconnected</span>
            </div>
            <button
              className="backend-status-close"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
          
          <p className="backend-status-message">
            The backend server is not responding. Start the server to enable appointment booking and admin features.
          </p>
          
          <div className="backend-status-code">
            cd backend && npm run dev
          </div>
          
          <button
            className="backend-status-action"
            onClick={() => window.location.reload()}
          >
            🔄 Retry Connection
          </button>
        </div>
      </div>
    </>
  );
}