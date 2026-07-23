import './style.css';

export default function AlertsPanel() {
  return (
    <section className="alerts-container">
      <div className="alerts-header">
        <h2 className="alerts-title">2. System Alerts Feed</h2>
        <p className="alerts-subtitle">Server-Sent Events (Unidirecional)</p>
      </div>
      <div className="alerts-placeholder">
        Escutando stream /api/alerts/stream...
      </div>
    </section>
  );
}