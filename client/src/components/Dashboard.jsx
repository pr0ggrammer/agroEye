import TanksSection from './TanksSection';
import FarmSection from './FarmSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard fade-in">
      {/* Hero Banner */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                <span className="hero-greeting">Welcome to</span>
                <span className="hero-brand">AgroEye Dashboard</span>
              </h1>
              <p className="hero-subtitle">
                Monitor your hydroponic farm in real-time. Track nutrient levels, 
                environmental conditions, and keep your crops healthy.
              </p>
              <div className="hero-stats">
                <div className="hero-stat">
                  <span className="hero-stat-icon">
                    <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4m0 4h.01"/></svg>
                  </span>
                  <span className="hero-stat-label">6 Plant Varieties</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-icon">
                    <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </span>
                  <span className="hero-stat-label">Mumbai, India</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-icon live-dot"></span>
                  <span className="hero-stat-label">Live Monitoring</span>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-plant-grid">
                <div className="hero-plant">
                  <div className="hero-plant-icon"><svg viewBox="0 0 24 24"><path d="M7 20h10M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 00-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg></div>
                  <span>Kale</span>
                </div>
                <div className="hero-plant">
                  <div className="hero-plant-icon"><svg viewBox="0 0 24 24"><path d="M7 20h10M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 00-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg></div>
                  <span>Lettuce</span>
                </div>
                <div className="hero-plant">
                  <div className="hero-plant-icon"><svg viewBox="0 0 24 24"><path d="M7 20h10M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 00-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg></div>
                  <span>Celery</span>
                </div>
                <div className="hero-plant">
                  <div className="hero-plant-icon"><svg viewBox="0 0 24 24"><path d="M7 20h10M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 00-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg></div>
                  <span>Pepper</span>
                </div>
                <div className="hero-plant">
                  <div className="hero-plant-icon"><svg viewBox="0 0 24 24"><path d="M7 20h10M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 00-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg></div>
                  <span>Cucumber</span>
                </div>
                <div className="hero-plant">
                  <div className="hero-plant-icon"><svg viewBox="0 0 24 24"><path d="M7 20h10M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 00-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg></div>
                  <span>Palak</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <div className="container">
        <div className="quick-nav">
          <a href="#tanks" className="quick-nav-item">
            <svg viewBox="0 0 24 24"><path d="M4.5 3h15A1.5 1.5 0 0121 4.5v15a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 19.5v-15A1.5 1.5 0 014.5 3z"/><path d="M3 9h18M3 15h18M9 3v18"/></svg>
            Tanks
          </a>
          <a href="#farms" className="quick-nav-item">
            <svg viewBox="0 0 24 24"><path d="M7 20h10M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 00-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg>
            Farms
          </a>
          <a href="#contact" className="quick-nav-item">
            <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
            Contact
          </a>
        </div>
      </div>

      {/* Sections */}
      <div id="tanks">
        <TanksSection />
      </div>
      <div id="farms">
        <FarmSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>

      <Footer />
    </div>
  );
}
