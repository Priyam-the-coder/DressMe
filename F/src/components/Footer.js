import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo and Branding */}
        <div className="footer-section logo">
          <img src="/logo.png" alt="TCS Logo" />
          <img src="/logo192.png" alt="Dress Me Icon" />
          <h3 className="brand-text">DressMe</h3>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>About</h4>
          <p>Application</p>
          <p>Innovation Team</p>
          <p>Future Endeavours</p>
        </div>

        <div className="footer-section">
          <h4>FAQ</h4>
          <p>Recommendation</p>
          <p>Wardrobe</p>
          <p>User Login</p>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Support</p>
          <p>Email</p>
          <p>Our Office</p>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h4>Find Us</h4>
          <div className="social-icons">
            <i className="fab fa-linkedin"></i>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-x-twitter"></i>
          </div>
        </div>
      </div>

      {/* Footer Bottom Info */}
      <div className="footer-bottom">
        <p>Contact | Privacy Policy | Terms</p>
        <p>© 2025 TCS DressMe. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
