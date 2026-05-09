import { useState, useEffect } from 'react';
import { usePolling } from '../hooks/usePolling';
import AIAnalysisPanel from './AIAnalysisPanel';
import { API_BASE } from '../data/plantData';
import './CameraPage.css';

// Hydroponics-specific farm images
const FARM_SCENES = [
  '/images/hydroponic-2.png',
  '/images/kale plant.png',
  '/images/pepper.png',
  '/images/pepper1.png',
  '/images/palak.png',
];

export default function CameraPage() {
  const [showFeed, setShowFeed] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [capturing, setCapturing] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [capturedImages, setCapturedImages] = useState([]);
  const [selectedCapture, setSelectedCapture] = useState(null);

  const { data: historyData, refetch: refetchHistory } = usePolling('/analysis/history', 120000);

  // Simulate camera feed by cycling images
  useEffect(() => {
    if (!showFeed) return;
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % FARM_SCENES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [showFeed]);

  // Load past captures
  useEffect(() => {
    if (historyData?.history) {
      setCapturedImages(historyData.history);
    }
  }, [historyData]);

  async function handleCapture() {
    setCapturing(true);
    // Simulate capture delay
    await new Promise(r => setTimeout(r, 800));
    setCapturing(false);

    // Immediately analyze
    await handleAnalyze();
  }

  async function handleAnalyze() {
    setAnalyzing(true);
    setAnalysisResult(null);
    try {
      const token = localStorage.getItem('agroeye_token');
      const res = await fetch(`${API_BASE}/analysis/simulate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          imagePath: FARM_SCENES[currentImage]
        })
      });
      const data = await res.json();
      setAnalysisResult(data.analysis);
      refetchHistory();
    } catch (err) {
      console.error('Analysis failed:', err);
    } finally {
      setAnalyzing(false);
    }
  }

  function viewCapturedAnalysis(capture) {
    setSelectedCapture(capture);
    setAnalysisResult(capture.analysis_result);
  }

  async function handleDelete(id, e) {
    e.stopPropagation();
    try {
      const token = localStorage.getItem('agroeye_token');
      await fetch(`${API_BASE}/analysis/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      // Optimistic UI update
      setCapturedImages(prev => prev.filter(img => img.id !== id));
      refetchHistory();
      if (selectedCapture?.id === id) {
        setSelectedCapture(null);
        setAnalysisResult(null);
      }
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  }

  return (
    <div className="camera-page fade-in">
      <div className="container">
        {/* Header */}
        <div className="camera-header">
          <div>
            <h1 className="section-title">
              <span className="icon">
                <svg viewBox="0 0 24 24"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><circle cx="12" cy="13" r="4" /></svg>
              </span>
              Camera & AI Analysis
            </h1>
            <p className="section-subtitle">
              Capture farm images and get AI-powered pest detection & NPK analysis
            </p>
          </div>
        </div>

        <div className="camera-layout">
          {/* Left: Camera Feed */}
          <div className="camera-feed-section">
            <div className="card camera-card">
              <div className="camera-card-header">
                <h3>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '6px' }}><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>
                  Live Camera Feed
                </h3>
                {showFeed && (
                  <div className="camera-live-badge">
                    <span className="live-dot"></span>
                    <span>LIVE</span>
                  </div>
                )}
              </div>

              {!showFeed ? (
                <div className="camera-placeholder">
                  <div className="camera-placeholder-icon">
                    <svg viewBox="0 0 24 24" width="56" height="56" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>
                  </div>
                  <h3>Farm Camera</h3>
                  <p>Click below to view the live feed from your farm camera</p>
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={() => setShowFeed(true)}
                    id="view-feed-btn"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    View Live Feed
                  </button>
                </div>
              ) : (
                <div className="camera-feed-wrapper">
                  <div className="camera-feed">
                    <img
                      src={FARM_SCENES[currentImage]}
                      alt="Farm camera feed"
                      className="camera-feed-image"
                    />
                    <div className="camera-overlay">
                      <div className="camera-overlay-top">
                        <span className="camera-timestamp">
                          {new Date().toLocaleString('en-IN')}
                        </span>
                        <span className="camera-label">CAM-01 | FARM</span>
                      </div>
                      <div className="camera-overlay-crosshair">
                        <div className="crosshair"></div>
                      </div>
                    </div>
                  </div>

                  <div className="camera-controls">
                    <button
                      className={`btn btn-primary btn-lg capture-btn ${capturing ? 'capturing' : ''}`}
                      onClick={handleCapture}
                      disabled={capturing || analyzing}
                      id="capture-btn"
                    >
                      {capturing ? (
                        <>
                          <span className="spinner"></span> Capturing...
                        </>
                      ) : analyzing ? (
                        <>
                          <span className="spinner"></span> Analyzing...
                        </>
                      ) : (
                        <>
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><circle cx="12" cy="13" r="4" /></svg>
                          Capture & Analyze
                        </>
                      )}
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setShowFeed(false)}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                      Stop Feed
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Captured Images Gallery */}
            <div className="card captured-gallery">
              <h3 className="gallery-title">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '4px' }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                Captured Images
                <span className="gallery-count">{capturedImages.length} captures</span>
              </h3>
              {capturedImages.length === 0 ? (
                <p className="gallery-empty">No images captured yet. Use the camera to capture and analyze farm images.</p>
              ) : (
                <div className="gallery-grid">
                  {capturedImages.map((img, idx) => (
                    <div
                      key={img.id || idx}
                      className={`gallery-item ${selectedCapture?.id === img.id ? 'selected' : ''}`}
                      onClick={() => viewCapturedAnalysis(img)}
                      style={{ position: 'relative' }}
                    >
                      <div className="gallery-thumb">
                        <img src={FARM_SCENES[idx % FARM_SCENES.length]} alt={`Capture ${idx + 1}`} />
                        {img.analysis_result?.pest?.detected && (
                          <div className="gallery-alert-badge">
                            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                          </div>
                        )}
                      </div>
                      <div className="gallery-meta">
                        <span className="gallery-date">
                          {new Date(img.captured_at.replace(' ', 'T') + 'Z').toLocaleDateString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className={`badge ${img.analysis_result?.healthStatus === 'Healthy' ? 'badge-healthy' : img.analysis_result?.healthStatus === 'Critical' ? 'badge-danger' : 'badge-warning'}`}>
                          {img.analysis_result?.healthStatus || 'Pending'}
                        </span>
                        <button 
                          onClick={(e) => handleDelete(img.id, e)}
                          style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '4px', display: 'flex' }}
                          title="Delete Capture"
                        >
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#ff4d4d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: AI Analysis */}
          <div className="analysis-section">
            <AIAnalysisPanel
              result={analysisResult}
              analyzing={analyzing}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
