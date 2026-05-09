import { useState } from 'react';
import { usePolling } from '../hooks/usePolling';
import TankCard from './TankCard';
import AddTankModal from './AddTankModal';
import './TanksSection.css';

export default function TanksSection() {
  const { data, loading, refetch } = usePolling('/tanks', 120000);
  const [showAddModal, setShowAddModal] = useState(false);

  const tanks = data?.tanks || [];

  return (
    <section className="section" id="tanks-section">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">
              <span className="icon">
                <svg viewBox="0 0 24 24"><path d="M4.5 3h15A1.5 1.5 0 0121 4.5v15a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 19.5v-15A1.5 1.5 0 014.5 3z"/><path d="M3 9h18M3 15h18M9 3v18"/></svg>
              </span>
              Nutrient Tanks
            </h2>
            <p className="section-subtitle">
              Live pH, TDS, and temperature readings from your nutrient reservoirs
            </p>
          </div>
          <div className="section-header-actions">
            <div className="tank-count">
              <span className="live-dot"></span>
              <span>{tanks.length} Tank{tanks.length !== 1 ? 's' : ''} Active</span>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setShowAddModal(true)}
              id="add-tank-btn"
            >
              <span>+</span> Add Tank
            </button>
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
        ) : tanks.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">
              <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 3h15A1.5 1.5 0 0121 4.5v15a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 19.5v-15A1.5 1.5 0 014.5 3z"/><path d="M3 9h18M3 15h18M9 3v18"/></svg>
            </span>
            <h3>No Tanks Yet</h3>
            <p>Add your first nutrient tank to start monitoring.</p>
            <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
              Add Your First Tank
            </button>
          </div>
        ) : (
          <div className="grid-3">
            {tanks.map(tank => (
              <TankCard key={tank.id} tank={tank} />
            ))}
          </div>
        )}

        {showAddModal && (
          <AddTankModal
            onClose={() => setShowAddModal(false)}
            onSuccess={() => { setShowAddModal(false); refetch(); }}
          />
        )}
      </div>
    </section>
  );
}
