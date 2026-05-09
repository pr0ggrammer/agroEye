import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--green-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: 'middle', marginRight: '6px'}}><path d="M12 2C12 2 4 8 4 16C4 20.418 7.582 24 12 24C16.418 24 20 20.418 20 16C20 8 12 2 12 2Z"/><path d="M12 6V20" opacity="0.5"/></svg>
              AgroEye
            </span>
            <p className="footer-tagline">Smart Hydroponics Farm Management</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Crops We Grow</h4>
              <span>Kale</span>
              <span>Lettuce</span>
              <span>Celery</span>
            </div>
            <div className="footer-col">
              <h4>&nbsp;</h4>
              <span>Pepper</span>
              <span>Cucumber</span>
              <span>Palak</span>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <a href="#tanks">Tanks</a>
              <a href="#farms">Farms</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} AgroEye Technologies. All rights reserved.</p>
          <p>Mumbai, Maharashtra, India</p>
        </div>
      </div>
    </footer>
  );
}
