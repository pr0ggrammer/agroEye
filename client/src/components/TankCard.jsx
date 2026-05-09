import './TankCard.css';

export default function TankCard({ tank }) {
  const readings = tank.readings || {};
  const ph = readings.ph?.value;
  const tds = readings.tds?.value;
  const temp = readings.temperature?.value;
  const lastUpdated = readings.ph?.timestamp || readings.temperature?.timestamp;

  // Check status
  function getPhStatus(val) {
    if (!val) return '';
    if (val < 5.5 || val > 7.0) return 'danger';
    if (val < 5.8 || val > 6.8) return 'warning';
    return '';
  }

  function getTdsStatus(val) {
    if (!val) return '';
    if (val < 400 || val > 2000) return 'danger';
    if (val < 500 || val > 1800) return 'warning';
    return '';
  }

  function getTempStatus(val) {
    if (!val) return '';
    if (val < 16 || val > 30) return 'danger';
    if (val < 18 || val > 28) return 'warning';
    return '';
  }

  const phStatus = getPhStatus(ph);
  const tdsStatus = getTdsStatus(tds);
  const tempStatus = getTempStatus(temp);
  const hasAlert = phStatus === 'danger' || tdsStatus === 'danger' || tempStatus === 'danger';

  function formatTime(ts) {
    if (!ts) return 'N/A';
    const d = new Date(ts);
    return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div className={`card tank-card ${hasAlert ? 'card-warning' : ''}`}>
      <div className="tank-card-header">
        <div className="tank-info">
          <h3 className="tank-name">
            <svg className="tank-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 3h15A1.5 1.5 0 0121 4.5v15a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 19.5v-15A1.5 1.5 0 014.5 3z"/><path d="M3 9h18M3 15h18M9 3v18"/></svg>
            {tank.name}
          </h3>
          <p className="tank-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {tank.location || 'No location'}
          </p>
        </div>
        <div className="tank-live">
          <span className="live-dot"></span>
          <span className="live-text">LIVE</span>
        </div>
      </div>

      {tank.description && (
        <p className="tank-description">{tank.description}</p>
      )}

      <div className="tank-readings">
        <div className={`reading-item ${phStatus}`}>
          <div className="reading-icon-wrap">
            <span className="reading-icon">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--green-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.527a2 2 0 01-.211.896L4.72 20.95a1 1 0 00.869 1.516h12.822a1 1 0 00.869-1.516l-5.069-10.527A2 2 0 0114 9.527V2"/><path d="M8.5 2h7"/></svg>
            </span>
          </div>
          <div className="reading-data">
            <span className={`sensor-value ${phStatus}`}>
              {ph != null ? ph.toFixed(1) : '--'}
            </span>
            <span className="sensor-label">pH Level</span>
          </div>
          <div className="reading-range">5.5 - 7.0</div>
        </div>

        <div className={`reading-item ${tdsStatus}`}>
          <div className="reading-icon-wrap">
            <span className="reading-icon">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--green-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>
            </span>
          </div>
          <div className="reading-data">
            <span className={`sensor-value ${tdsStatus}`}>
              {tds != null ? Math.round(tds) : '--'}
              <span className="sensor-unit"> ppm</span>
            </span>
            <span className="sensor-label">TDS</span>
          </div>
          <div className="reading-range">500 - 1800</div>
        </div>

        <div className={`reading-item ${tempStatus}`}>
          <div className="reading-icon-wrap">
            <span className="reading-icon">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--green-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/></svg>
            </span>
          </div>
          <div className="reading-data">
            <span className={`sensor-value ${tempStatus}`}>
              {temp != null ? temp.toFixed(1) : '--'}
              <span className="sensor-unit">°C</span>
            </span>
            <span className="sensor-label">Temperature</span>
          </div>
          <div className="reading-range">18 - 28°C</div>
        </div>
      </div>

      <div className="tank-footer">
        <span className="tank-updated">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Updated: {formatTime(lastUpdated)}
        </span>
      </div>
    </div>
  );
}
