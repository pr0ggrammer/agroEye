import { useState } from 'react';
import { useApi } from '../hooks/usePolling';

export default function AddTankModal({ onClose, onSuccess }) {
  const { apiCall } = useApi();
  const [form, setForm] = useState({ name: '', location: '', description: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('Tank name is required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await apiCall('/tanks', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content slide-up" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Add New Tank</h2>
          <button className="modal-close" onClick={onClose}>&#10005;</button>
        </div>

        <form onSubmit={handleSubmit} id="add-tank-form">
          {error && (
            <div className="login-error" style={{ marginBottom: '16px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              {error}
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="tank-name">Tank Name *</label>
            <input
              id="tank-name"
              type="text"
              className="form-input"
              placeholder="e.g., Tank Delta"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="tank-location">Location</label>
            <input
              id="tank-location"
              type="text"
              className="form-input"
              placeholder="e.g., Section D - Ground Floor"
              value={form.location}
              onChange={e => setForm({ ...form, location: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="tank-description">Description</label>
            <textarea
              id="tank-description"
              className="form-input"
              placeholder="Brief description of the tank's purpose..."
              rows={3}
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              style={{ resize: 'vertical', minHeight: '80px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} style={{ flex: 1 }}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ flex: 1 }}>
              {loading ? 'Adding...' : '+ Add Tank'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
