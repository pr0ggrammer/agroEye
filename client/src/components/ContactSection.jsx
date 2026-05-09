import './ContactSection.css';

export default function ContactSection() {
  return (
    <section className="section contact-section" id="contact-section">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">
              <span className="icon">
                <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
              </span>
              Contact Us
            </h2>
            <p className="section-subtitle">
              Get in touch with the AgroEye farm management team
            </p>
          </div>
        </div>

        <div className="contact-grid">
          <div className="card contact-card">
            <div className="contact-icon">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="var(--green-600)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <h3>Farm Location</h3>
            <p>AgroEye Hydroponics Farm</p>
            <p>Andheri East, Mumbai</p>
            <p>Maharashtra 400069, India</p>
          </div>

          <div className="card contact-card">
            <div className="contact-icon">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="var(--green-600)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <h3>Email</h3>
            <p>info@agroeye.in</p>
            <p>support@agroeye.in</p>
            <a href="mailto:info@agroeye.in" className="btn btn-ghost btn-sm" style={{ marginTop: '12px' }}>
              Send Email
            </a>
          </div>

          <div className="card contact-card">
            <div className="contact-icon">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="var(--green-600)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
            </div>
            <h3>Phone</h3>
            <p>+91 98765 43210</p>
            <p>+91 22 2840 XXXX</p>
            <a href="tel:+919876543210" className="btn btn-ghost btn-sm" style={{ marginTop: '12px' }}>
              Call Now
            </a>
          </div>

          <div className="card contact-card">
            <div className="contact-icon">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="var(--green-600)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <h3>Working Hours</h3>
            <p>Monday - Saturday</p>
            <p>6:00 AM - 8:00 PM IST</p>
            <p className="contact-note">Farm visits by appointment</p>
          </div>
        </div>
      </div>
    </section>
  );
}
