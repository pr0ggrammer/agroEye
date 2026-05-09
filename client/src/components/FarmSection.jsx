import { useState } from 'react';
import { usePolling } from '../hooks/usePolling';
import FarmCard from './FarmCard';
import AddFarmModal from './AddFarmModal';
import './FarmSection.css';

export default function FarmSection() {
  const { data, loading, refetch } = usePolling('/farms', 120000);
  const [showAddModal, setShowAddModal] = useState(false);

  const farms = data?.farms || [];

  return (
    <section className="section farm-section" id="farms-section">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">
              <span className="icon">
                <svg viewBox="0 0 24 24"><path d="M7 20h10M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 00-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg>
              </span>
              Farm Sections
            </h2>
            <p className="section-subtitle">
              Live humidity, temperature, and light readings from each growing section
            </p>
          </div>
          <div className="section-header-actions">
            <div className="farm-count">
              <span className="live-dot"></span>
              <span>{farms.length} Farm{farms.length !== 1 ? 's' : ''} Active</span>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setShowAddModal(true)}
              id="add-farm-btn"
            >
              <span>+</span> Add Farm
            </button>
          </div>
        </div>

        {/* Temperature Alert Legend */}
        <div className="alert-legend">
          <div className="alert-legend-item">
            <span className="alert-dot green"></span>
            <span>Within optimal range</span>
          </div>
          <div className="alert-legend-item">
            <span className="alert-dot orange"></span>
            <span>Approaching threshold</span>
          </div>
          <div className="alert-legend-item">
            <span className="alert-dot red"></span>
            <span>Exceeds optimal temperature</span>
          </div>
        </div>

        {loading ? (
          <div className="loading-grid">
            {[1, 2, 3].map(i => (
              <div key={i} className="card skeleton-card">
                <div className="skeleton-line w-60"></div>
                <div className="skeleton-line w-40"></div>
                <div className="skeleton-sensors">
                  <div className="skeleton-circle"></div>
                  <div className="skeleton-circle"></div>
                  <div className="skeleton-circle"></div>
                </div>
              </div>
            ))}
          </div>
        ) : farms.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">
              <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 00-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg>
            </span>
            <h3>No Farm Sections Yet</h3>
            <p>Add your first farm section to start monitoring crop conditions.</p>
            <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
              Add Your First Farm
            </button>
          </div>
        ) : (
          <div className="grid-3">
            {farms.map(farm => (
              <FarmCard key={farm.id} farm={farm} />
            ))}
          </div>
        )}

        {showAddModal && (
          <AddFarmModal
            onClose={() => setShowAddModal(false)}
            onSuccess={() => { setShowAddModal(false); refetch(); }}
          />
        )}
      </div>
    </section>
  );
}
