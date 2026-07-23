import './style.css'

function Header() {
  return (
    <header className="header-container">
        <div className="header-title-wrapper">
          <div className="header-status-dot" />
          <h1 className="header-title">
            Realtime <span className="header-title-highlight">Architecture Lab </span>
          </h1>
        </div>
        <div className="header-info-wrapper">
          <span> Status: <strong className="header-status-text">ONLINE</strong></span>
          <span className="header-port-badge">
            TCP :8080
          </span>
        </div>
      </header>
  );
}

export default Header;