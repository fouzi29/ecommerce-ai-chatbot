import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import './styles/chatbot.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Error Boundary caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif", backgroundColor: "#f8fafc", color: "#0f172a", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyCenter: "center" }}>
          <div style={{ maxWidth: "600px", width: "100%", backgroundColor: "#ffffff", padding: "2rem", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}>
            <h2 style={{ color: "#7c3aed", fontWeight: "900", marginBottom: "0.5rem" }}>⚡ AURA AI Assistant Notice</h2>
            <p style={{ color: "#475569", fontSize: "0.875rem", lineHeight: "1.6" }}>
              {this.state.error?.message || "An initialization warning occurred."}
            </p>
            <button 
              onClick={() => { localStorage.clear(); window.location.reload(); }}
              style={{ marginTop: "1.5rem", padding: "0.75rem 1.5rem", backgroundColor: "#7c3aed", color: "#ffffff", border: "none", borderRadius: "12px", fontWeight: "800", cursor: "pointer", width: "100%" }}
            >
              Reset Application Settings & Refresh
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
