import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      {/* Animated background elements */}
      <div className="login-bg-effects">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
      </div>

      <div className="login-container">
        <div className="login-card">
          {/* Logo & Brand */}
          <div className="login-header">
            <div className="login-logo">
              <div className="logo-icon">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4C24 4 8 14 8 28C8 36.837 15.163 44 24 44C32.837 44 40 36.837 40 28C40 14 24 4 24 4Z" fill="url(#leaf-grad)" opacity="0.2"/>
                  <path d="M24 8C24 8 12 16 12 28C12 34.627 17.373 40 24 40C30.627 40 36 34.627 36 28C36 16 24 8 24 8Z" stroke="url(#leaf-grad)" strokeWidth="2"/>
                  <path d="M24 14V36" stroke="url(#leaf-grad)" strokeWidth="1.5" opacity="0.6"/>
                  <path d="M24 20C20 24 18 28 18 32" stroke="url(#leaf-grad)" strokeWidth="1.5" opacity="0.4"/>
                  <path d="M24 20C28 24 30 28 30 32" stroke="url(#leaf-grad)" strokeWidth="1.5" opacity="0.4"/>
                  <defs>
                    <linearGradient id="leaf-grad" x1="8" y1="4" x2="40" y2="44">
                      <stop offset="0%" stopColor="#34d399"/>
                      <stop offset="100%" stopColor="#059669"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h1 className="login-brand">AgroEye</h1>
            </div>
            <p className="login-tagline">Hydroponics Farm Management System</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="login-form" id="login-form">
            {error && (
              <div className="login-error">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {error}
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="username">Username</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </span>
                <input
                  id="username"
                  type="text"
                  className="form-input"
                  placeholder="Enter your username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                </span>
                <input
                  id="password"
                  type="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg login-submit"
              id="login-submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Authenticating...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="login-footer-text">
            <p>Powered by AgroEye Technologies</p>
            <p className="login-location">Mumbai, India</p>
          </div>
        </div>
      </div>
    </div>
  );
}
