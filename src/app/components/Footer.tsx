// components/Footer.js
import React from "react";

const Footer = () => (
  <footer className="footer py-8 bg-secondary text-accent text-center">
    <p>&copy; 2024 Marketplace. All Rights Reserved.</p>
    <div className="mt-4">
      <a href="/privacy-policy" className="text-accent mx-2">Privacy Policy</a>
      <a href="/terms-of-service" className="text-accent mx-2">Terms of Service</a>
    </div>
  </footer>
);

export default Footer;
