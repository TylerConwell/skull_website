import React from 'react';
// You would import your CSS file here, e.g., import './Footer.css';

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        {/* Add your footer content here, e.g., links, copyright, etc. */}
        <p>&copy; {new Date().getFullYear()} My Website</p>
        <p>Contact us: info@example.com</p>
      </div>
    </footer>
  );
}

export default Footer;
