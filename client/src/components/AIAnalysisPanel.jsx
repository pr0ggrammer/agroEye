import { PESTS } from '../data/plantData';
import './AIAnalysisPanel.css';

export default function AIAnalysisPanel({ result, analyzing }) {
  if (analyzing) {
    return (
      <div className="card ai-panel">
        <div className="ai-panel-header">
          <h3>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: 'middle', marginRight: '6px'}}><path d="M12 2a4 4 0 014 4v1a2 2 0 012 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2V6a4 4 0 014-4z"/><path d="M8 14v.5M16 14v.5M12 14v2"/><rect x="6" y="18" width="12" height="4" rx="1"/></svg>
            AI Analysis
          </h3>
        </div>
        <div className="ai-loading">
          <div className="ai-loading-animation">
            <div className="ai-scan-line"></div>
            <span className="ai-scan-icon">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="var(--green-500)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
            </span>
          </div>
          <p className="ai-loading-text">Analyzing image...</p>
          <p className="ai-loading-sub">Running pest detection & NPK analysis</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="card ai-panel">
        <div className="ai-panel-header">
          <h3>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: 'middle', marginRight: '6px'}}><path d="M12 2a4 4 0 014 4v1a2 2 0 012 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2V6a4 4 0 014-4z"/><path d="M8 14v.5M16 14v.5M12 14v2"/><rect x="6" y="18" width="12" height="4" rx="1"/></svg>
            AI Analysis
          </h3>
        </div>
        <div className="ai-empty">
          <span className="ai-empty-icon">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
          </span>
          <h4>No Analysis Yet</h4>
          <p>Capture an image from the camera feed to run AI-powered plant analysis.</p>
          <div className="ai-capabilities">
            <div className="ai-cap-item">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--green-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.527a2 2 0 01-.211.896L4.72 20.95a1 1 0 00.869 1.516h12.822a1 1 0 00.869-1.516l-5.069-10.527A2 2 0 0114 9.527V2"/><path d="M8.5 2h7"/></svg>
              <span>NPK Values Detection</span>
            </div>
            <div className="ai-cap-item">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--green-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c1-3 6-5.5 6-10a6 6 0 10-12 0c0 4.5 5 7 6 10z"/><circle cx="12" cy="12" r="2"/></svg>
              <span>Pest Identification</span>
            </div>
            <div className="ai-cap-item">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--green-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7z"/></svg>
              <span>Pesticide Recommendation</span>
            </div>
            <div className="ai-cap-item">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--green-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
              <span>Purchase Links</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { npk, pest, healthStatus, healthScore } = result;
  
  const healthBadgeClass = healthStatus === 'Healthy' ? 'badge-healthy' 
    : healthStatus === 'Critical' ? 'badge-danger' : 'badge-warning';

  function npkBarWidth(value, max) {
    return Math.min((value / max) * 100, 100);
  }

  function npkStatusColor(status) {
    if (status === 'optimal') return 'var(--status-healthy)';
    if (status === 'low') return 'var(--status-info)';
    return 'var(--status-warning)';
  }

  return (
    <div className="card ai-panel slide-up">
      <div className="ai-panel-header">
        <h3>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: 'middle', marginRight: '6px'}}><path d="M12 2a4 4 0 014 4v1a2 2 0 012 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2V6a4 4 0 014-4z"/><path d="M8 14v.5M16 14v.5M12 14v2"/><rect x="6" y="18" width="12" height="4" rx="1"/></svg>
          AI Analysis Results
        </h3>
        <span className={`badge ${healthBadgeClass}`}>
          {healthStatus}
        </span>
      </div>

      {/* Health Score */}
      <div className="health-score-section">
        <div className="health-score-ring">
          <svg viewBox="0 0 100 100" className="health-ring-svg">
            <circle cx="50" cy="50" r="40" stroke="rgba(0,0,0,0.06)" strokeWidth="8" fill="none" />
            <circle
              cx="50" cy="50" r="40"
              stroke={healthScore >= 70 ? 'var(--status-healthy)' : healthScore >= 40 ? 'var(--status-warning)' : 'var(--status-danger)'}
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${healthScore * 2.51} 251`}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              className="health-ring-progress"
            />
          </svg>
          <span className="health-score-value">{healthScore}</span>
        </div>
        <div className="health-score-label">Health Score</div>
      </div>

      {/* NPK Analysis */}
      <div className="ai-section">
        <h4 className="ai-section-title">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: 'middle', marginRight: '4px'}}><path d="M10 2v7.527a2 2 0 01-.211.896L4.72 20.95a1 1 0 00.869 1.516h12.822a1 1 0 00.869-1.516l-5.069-10.527A2 2 0 0114 9.527V2"/><path d="M8.5 2h7"/></svg>
          NPK Values
        </h4>
        
        <div className="npk-item">
          <div className="npk-header">
            <span className="npk-name">Nitrogen (N)</span>
            <span className="npk-value" style={{ color: npkStatusColor(npk.nitrogen.status) }}>
              {npk.nitrogen.value} {npk.nitrogen.unit}
            </span>
          </div>
          <div className="npk-bar-bg">
            <div
              className="npk-bar"
              style={{
                width: `${npkBarWidth(npk.nitrogen.value, 200)}%`,
                background: npkStatusColor(npk.nitrogen.status),
              }}
            ></div>
            <div className="npk-optimal-range" style={{
              left: `${npkBarWidth(npk.nitrogen.optimal.min, 200)}%`,
              width: `${npkBarWidth(npk.nitrogen.optimal.max - npk.nitrogen.optimal.min, 200)}%`,
            }}></div>
          </div>
          <div className="npk-range-info">
            Optimal: {npk.nitrogen.optimal.min}-{npk.nitrogen.optimal.max} ppm
            <span className={`npk-status ${npk.nitrogen.status}`}>{npk.nitrogen.status}</span>
          </div>
        </div>

        <div className="npk-item">
          <div className="npk-header">
            <span className="npk-name">Phosphorus (P)</span>
            <span className="npk-value" style={{ color: npkStatusColor(npk.phosphorus.status) }}>
              {npk.phosphorus.value} {npk.phosphorus.unit}
            </span>
          </div>
          <div className="npk-bar-bg">
            <div
              className="npk-bar"
              style={{
                width: `${npkBarWidth(npk.phosphorus.value, 100)}%`,
                background: npkStatusColor(npk.phosphorus.status),
              }}
            ></div>
            <div className="npk-optimal-range" style={{
              left: `${npkBarWidth(npk.phosphorus.optimal.min, 100)}%`,
              width: `${npkBarWidth(npk.phosphorus.optimal.max - npk.phosphorus.optimal.min, 100)}%`,
            }}></div>
          </div>
          <div className="npk-range-info">
            Optimal: {npk.phosphorus.optimal.min}-{npk.phosphorus.optimal.max} ppm
            <span className={`npk-status ${npk.phosphorus.status}`}>{npk.phosphorus.status}</span>
          </div>
        </div>

        <div className="npk-item">
          <div className="npk-header">
            <span className="npk-name">Potassium (K)</span>
            <span className="npk-value" style={{ color: npkStatusColor(npk.potassium.status) }}>
              {npk.potassium.value} {npk.potassium.unit}
            </span>
          </div>
          <div className="npk-bar-bg">
            <div
              className="npk-bar"
              style={{
                width: `${npkBarWidth(npk.potassium.value, 300)}%`,
                background: npkStatusColor(npk.potassium.status),
              }}
            ></div>
            <div className="npk-optimal-range" style={{
              left: `${npkBarWidth(npk.potassium.optimal.min, 300)}%`,
              width: `${npkBarWidth(npk.potassium.optimal.max - npk.potassium.optimal.min, 300)}%`,
            }}></div>
          </div>
          <div className="npk-range-info">
            Optimal: {npk.potassium.optimal.min}-{npk.potassium.optimal.max} ppm
            <span className={`npk-status ${npk.potassium.status}`}>{npk.potassium.status}</span>
          </div>
        </div>
      </div>

      {/* Pest Detection */}
      <div className="ai-section">
        <h4 className="ai-section-title">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: 'middle', marginRight: '4px'}}><path d="M12 22c1-3 6-5.5 6-10a6 6 0 10-12 0c0 4.5 5 7 6 10z"/><circle cx="12" cy="12" r="2"/></svg>
          Pest Detection
        </h4>
        
        {pest.detected ? (
          <div className="pest-detected">
            <div className="pest-alert-card">
              <div className="pest-alert-header">
                <span className={`badge ${pest.severity === 'high' ? 'badge-danger' : 'badge-warning'}`}>
                  {pest.severity === 'high' ? 'High Severity' : 'Moderate'}
                </span>
                <span className="pest-confidence">
                  {Math.round(pest.confidence * 100)}% confidence
                </span>
              </div>
              
              <h4 className="pest-name">
                {pest.pest}
              </h4>
              <p className="pest-description">{pest.description}</p>

              <div className="pest-recommendation">
                <h5>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: 'middle', marginRight: '4px'}}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7z"/></svg>
                  Recommended Treatment
                </h5>
                <p className="pest-pesticide">{pest.recommendation.pesticide}</p>
                <p className="pest-application">{pest.recommendation.application}</p>
                
                <a
                  href={pest.recommendation.buyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary pest-buy-btn"
                  id="buy-pesticide-btn"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
                  Buy Pesticide on Amazon.in
                </a>
              </div>

              {PESTS[pest.pest] && (
                <div className="pest-prevention">
                  <h5>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: 'middle', marginRight: '4px'}}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    Prevention Tips
                  </h5>
                  <p>{PESTS[pest.pest].prevention}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="pest-healthy">
            <div className="pest-healthy-icon">
              <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="var(--status-healthy)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h4>No Pests Detected</h4>
            <p>{pest.description}</p>
            <span className="pest-confidence">
              {Math.round(pest.confidence * 100)}% confidence
            </span>
          </div>
        )}
      </div>

      <div className="ai-timestamp">
        Analysis performed: {new Date(result.timestamp).toLocaleString('en-IN')}
      </div>
    </div>
  );
}
