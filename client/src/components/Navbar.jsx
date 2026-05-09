import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar" id="navbar">
      <div className="container navbar-inner">
        {/* Logo */}
        <Link to="/dashboard" className="navbar-brand">
          <div className="navbar-logo-icon">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="M16 2C16 2 4 10 4 20C4 26.627 9.373 32 16 32C22.627 32 28 26.627 28 20C28 10 16 2 16 2Z" fill="url(#nav-grad)" opacity="0.3"/>
              <path d="M16 6C16 6 8 12 8 20C8 24.418 11.582 28 16 28C20.418 28 24 24.418 24 20C24 12 16 6 16 6Z" stroke="url(#nav-grad)" strokeWidth="1.5"/>
              <path d="M16 10V26" stroke="url(#nav-grad)" strokeWidth="1" opacity="0.5"/>
              <defs>
                <linearGradient id="nav-grad" x1="4" y1="2" x2="28" y2="32">
                  <stop offset="0%" stopColor="#34d399"/>
                  <stop offset="100%" stopColor="#059669"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="navbar-brand-text">AgroEye</span>
        </Link>

        {/* Navigation Links */}
        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <Link
            to="/dashboard"
            className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            Dashboard
          </Link>
          <Link
            to="/camera"
            className={`nav-link nav-link-camera ${location.pathname === '/camera' ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            <svg viewBox="0 0 24 24"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
            Camera & AI
          </Link>
        </div>

        {/* User Menu */}
        <div className="navbar-user">
          <div className="navbar-user-info">
            <span className="navbar-user-avatar">
              {user?.fullName?.charAt(0) || 'U'}
            </span>
            <span className="navbar-user-name">{user?.fullName || 'User'}</span>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={logout} id="logout-btn">
            Logout
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${menuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </nav>
  );
}
