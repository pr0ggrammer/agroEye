import { PLANTS, isTempAlert } from '../data/plantData';
import './FarmCard.css';

export default function FarmCard({ farm }) {
  const readings = farm.readings || {};
  const humidity = readings.humidity?.value;
  const temp = readings.temperature?.value;
  const light = readings.light?.value;
  const lastUpdated = readings.temperature?.timestamp || readings.humidity?.timestamp;
  
  const plant = PLANTS[farm.plant_type] || {};
  const tempAlert = temp != null && isTempAlert(farm.plant_type, temp);
  
  // Determine card alert class
  let cardAlertClass = '';
  let alertMessage = '';
  if (tempAlert) {
    const diff = (temp - plant.tempMax).toFixed(1);
    if (temp > plant.tempMax + 3) {
      cardAlertClass = 'card-danger';
      alertMessage = `CRITICAL: Temperature ${temp.toFixed(1)}°C exceeds optimal by +${diff}°C for ${farm.plant_type} (max ${plant.tempMax}°C)`;
    } else {
      cardAlertClass = 'card-warning';
      alertMessage = `Temperature ${temp.toFixed(1)}°C exceeds optimal range for ${farm.plant_type} (max ${plant.tempMax}°C)`;
    }
  }

  function getHumidityStatus() {
    if (!humidity || !plant.humidityMin) return '';
    if (humidity < plant.humidityMin - 5 || humidity > plant.humidityMax + 5) return 'danger';
    if (humidity < plant.humidityMin || humidity > plant.humidityMax) return 'warning';
    return '';
  }

  function getLightStatus() {
    if (!light || !plant.lightMin) return '';
    if (light < plant.lightMin - 100 || light > plant.lightMax + 100) return 'warning';
    return '';
  }

  function formatTime(ts) {
    if (!ts) return 'N/A';
    const d = new Date(ts);
    return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div className={`card farm-card ${cardAlertClass}`}>
      {/* Plant type indicator bar */}
      <div className={`farm-card-accent ${tempAlert ? 'alert' : ''}`}></div>
      
      <div className="farm-card-header">
        <div className="farm-info">
          <div className="farm-name-row">
            <span className="farm-plant-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="var(--green-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 00-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg>
            </span>
            <h3 className="farm-name">{farm.name}</h3>
          </div>
          <div className="farm-meta">
            <span className="badge badge-info">{farm.plant_type}</span>
            <span className="farm-location">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {farm.location || 'N/A'}
            </span>
          </div>
        </div>
        <div className="tank-live">
          <span className="live-dot"></span>
          <span className="live-text">LIVE</span>
        </div>
      </div>

      {/* Temperature Alert Banner */}
      {tempAlert && (
        <div className={`temp-alert-banner ${temp > plant.tempMax + 3 ? 'critical' : 'warning'}`}>
          <span className="temp-alert-text">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: 'middle', marginRight: '6px'}}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            {alertMessage}
          </span>
        </div>
      )}

      {farm.description && (
        <p className="farm-description">{farm.description}</p>
      )}

      {/* Plant Info */}
      <div className="plant-quick-info">
        <span title="Growth Period">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          {plant.growthDays || 'N/A'}
        </span>
        <span title="System Type">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
          {plant.system || 'N/A'}
        </span>
      </div>

      {/* Sensor Readings */}
      <div className="farm-readings">
        <div className={`reading-item ${getHumidityStatus()}`}>
          <div className="reading-icon-wrap">
            <span className="reading-icon">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--green-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>
            </span>
          </div>
          <div className="reading-data">
            <span className={`sensor-value ${getHumidityStatus()}`}>
              {humidity != null ? humidity.toFixed(1) : '--'}
              <span className="sensor-unit">%</span>
            </span>
            <span className="sensor-label">Humidity</span>
          </div>
          <div className="reading-range">{plant.humidityMin || '?'}-{plant.humidityMax || '?'}%</div>
        </div>

        <div className={`reading-item ${tempAlert ? (temp > plant.tempMax + 3 ? 'danger' : 'warning') : ''}`}>
          <div className="reading-icon-wrap">
            <span className="reading-icon">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--green-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/></svg>
            </span>
          </div>
          <div className="reading-data">
            <span className={`sensor-value ${tempAlert ? 'danger' : ''}`}>
              {temp != null ? temp.toFixed(1) : '--'}
              <span className="sensor-unit">°C</span>
            </span>
            <span className="sensor-label">Temperature</span>
          </div>
          <div className="reading-range">{plant.tempMin || '?'}-{plant.tempMax || '?'}°C</div>
        </div>

        <div className={`reading-item ${getLightStatus()}`}>
          <div className="reading-icon-wrap">
            <span className="reading-icon">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--green-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            </span>
          </div>
          <div className="reading-data">
            <span className={`sensor-value ${getLightStatus()}`}>
              {light != null ? Math.round(light) : '--'}
              <span className="sensor-unit"> lux</span>
            </span>
            <span className="sensor-label">Light</span>
          </div>
          <div className="reading-range">{plant.lightMin || '?'}-{plant.lightMax || '?'}</div>
        </div>
      </div>

      <div className="farm-footer">
        <span className="tank-updated">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Updated: {formatTime(lastUpdated)}
        </span>
      </div>
    </div>
  );
}
